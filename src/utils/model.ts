import * as tf from '@tensorflow/tfjs';

export const createModel = (inputShape: number[], numClasses: number) => {
  const model = tf.sequential();

  model.add(
    tf.layers.dense({
      inputShape: [inputShape[1]],
      units: 64,
      activation: 'relu',
      dtype: 'float32',
    })
  );

  model.add(
    tf.layers.dense({
      units: 32,
      activation: 'relu',
    })
  );

  model.add(
    tf.layers.dense({
      units: numClasses,
      activation: 'softmax',
    })
  );

  model.compile({
    optimizer: tf.train.adam(),
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy'],
  });

  return model;
};
