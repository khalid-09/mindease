import * as tf from '@tensorflow/tfjs';
import { createModel } from './model';
import { preprocessText, fitTfIdf } from './preprocess';
import { readFileSync } from 'fs';
import * as Papa from 'papaparse';

interface DataRow {
  statement: string;
  status: string;
}

const readCSV = (filePath: string): DataRow[] => {
  console.log(`Reading CSV file from ${filePath}`);
  const fileContent = readFileSync(filePath, 'utf-8');
  const { data } = Papa.parse<DataRow>(fileContent, {
    header: true,
    skipEmptyLines: true,
  });
  console.log('CSV file read successfully.');
  return data;
};

const labelMap: { [key: string]: number } = {
  Anxiety: 0,
  Normal: 1,
  Suicidal: 2,
  Depression: 3,
  Stress: 4,
  Bipolar: 5,
  'Personality Disorder': 6,
};

const shuffleArray = <T>(array: T[]): T[] => {
  console.log('Shuffling data...');
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  console.log('Data shuffled.');
  return array;
};

const BATCH_SIZE = 1000;

export const trainModel = async (filePath: string) => {
  console.log('Starting to train model...');
  const data = shuffleArray(readCSV(filePath));

  const texts = data.map(row => row.statement);
  const labels = data.map(row => labelMap[row.status]);

  console.log('Fitting TF-IDF on all texts...');
  fitTfIdf(texts);
  console.log('TF-IDF fitting completed.');

  console.log('Preprocessing texts...');
  const processedTexts = texts.map(text => preprocessText(text));
  console.log('Text preprocessing completed.');

  console.log('Padding sequences...');
  const maxLength = Math.max(...processedTexts.map(text => text.length));
  const paddedTexts = processedTexts.map(text => {
    const padding = Array(maxLength - text.length).fill(0);
    return [...text, ...padding];
  });
  console.log('Sequences padded.');

  // Convert labels to one-hot encoded vectors
  const numClasses = Object.keys(labelMap).length;
  const oneHotLabels = labels.map(label => {
    const oneHot = new Array(numClasses).fill(0);
    oneHot[label] = 1;
    return oneHot;
  });

  // Split the data
  console.log('Splitting data into training, validation, and test sets...');
  const totalSamples = paddedTexts.length;
  const trainSize = Math.floor(totalSamples * 0.7);
  const valSize = Math.floor(totalSamples * 0.15);

  const trainTexts = paddedTexts.slice(0, trainSize);
  const trainLabels = oneHotLabels.slice(0, trainSize);

  const valTexts = paddedTexts.slice(trainSize, trainSize + valSize);
  const valLabels = oneHotLabels.slice(trainSize, trainSize + valSize);

  const testTexts = paddedTexts.slice(trainSize + valSize);
  const testLabels = oneHotLabels.slice(trainSize + valSize);
  console.log('Data split completed.');

  const model = createModel([1, maxLength], numClasses);

  // Train the model in batches
  console.log('Training the model...');
  for (let i = 0; i < trainTexts.length; i += BATCH_SIZE) {
    const batchTexts = trainTexts.slice(i, i + BATCH_SIZE);
    const batchLabels = trainLabels.slice(i, i + BATCH_SIZE);

    const batchX = tf.tensor2d(
      batchTexts,
      [batchTexts.length, maxLength],
      'float32'
    );
    const batchY = tf.tensor2d(
      batchLabels,
      [batchLabels.length, numClasses],
      'float32'
    );

    await model.fit(batchX, batchY, {
      epochs: 1,
      batchSize: 16,
      verbose: 0,
    });

    batchX.dispose();
    batchY.dispose();

    console.log(
      `Processed batch ${i / BATCH_SIZE + 1} of ${Math.ceil(
        trainTexts.length / BATCH_SIZE
      )}`
    );
  }
  console.log('Model training completed.');

  // Evaluate the model in batches
  console.log('Evaluating the model...');
  let totalLoss = 0;
  let totalAccuracy = 0;
  let batchCount = 0;

  for (let i = 0; i < testTexts.length; i += BATCH_SIZE) {
    const batchTexts = testTexts.slice(i, i + BATCH_SIZE);
    const batchLabels = testLabels.slice(i, i + BATCH_SIZE);

    const batchX = tf.tensor2d(
      batchTexts,
      [batchTexts.length, maxLength],
      'float32'
    );
    const batchY = tf.tensor2d(
      batchLabels,
      [batchLabels.length, numClasses],
      'float32'
    );

    const evalResult = model.evaluate(batchX, batchY) as tf.Scalar[];
    totalLoss += evalResult[0].dataSync()[0];
    totalAccuracy += evalResult[1].dataSync()[0];
    batchCount++;

    batchX.dispose();
    batchY.dispose();
  }

  console.log(`Test loss: ${totalLoss / batchCount}`);
  console.log(`Test accuracy: ${totalAccuracy / batchCount}`);
  console.log('Model evaluation completed.');

  return model;
};
