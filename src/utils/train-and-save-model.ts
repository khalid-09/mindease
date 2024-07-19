// import '@tensorflow/tfjs-node';
import { trainModel } from '../utils/train';
import fs from 'fs';
import path from 'path';

(async () => {
  const filePath = './src/utils/dataset/data.csv';
  const modelSavePath = './src/utils/trained-model';

  try {
    console.log('Starting model training...');
    const model = await trainModel(filePath);
    console.log('Model training completed.');

    console.log('Ensuring the model save directory exists...');
    fs.mkdirSync(path.dirname(modelSavePath), { recursive: true });

    console.log('Saving model...');
    await model.save(`file://${modelSavePath}`);
    console.log('Model saved successfully.');
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
