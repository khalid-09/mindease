import { PorterStemmer, WordTokenizer, TfIdf } from 'natural';
import * as winkLemmatizer from 'wink-lemmatizer';

const tokenizer = new WordTokenizer();
const stemmer = PorterStemmer;
const tfidf = new TfIdf();

export const fitTfIdf = (texts: string[]) => {
  texts.forEach(text => {
    const tokens = tokenizer.tokenize(text.toLowerCase());
    const lemmatized = tokens.map(token => winkLemmatizer.verb(token));
    const stemmed = lemmatized.map(token => stemmer.stem(token));
    tfidf.addDocument(stemmed.join(' '));
  });
};

export const preprocessText = (text: string): number[] => {
  let tokens = tokenizer.tokenize(text.toLowerCase());
  tokens = tokens.map(token => winkLemmatizer.verb(token));
  tokens = tokens.map(token => stemmer.stem(token));

  return tokens.map(token => {
    const tfidfScore = tfidf.tfidf(token, 0);
    return isNaN(tfidfScore) ? 0 : tfidfScore;
  });
};

//  "train-model": "set NODE_OPTIONS=--max-old-space-size=8192 && pnpm exec tsx src/utils/train-and-save-model.ts"
