import process from 'node:process';
import { __dirname } from '../constants.js';

const echoInput = (chunk) => {
  const chunkStringified = chunk.toString();

  
  if (chunkStringified.includes('\n')) {
    process.stdout.write(`You are currently in ${__dirname}\n`);
  }
};

export const runPathModule = () => {
  process.stdin.on('data', echoInput);

}
