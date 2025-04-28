import process from 'node:process';
import { __dirname } from '../constants.js';
import { colorize } from '../utils.js';

const echoInput = (chunk) => {
  const chunkStringified = chunk.toString();

  
  if (chunkStringified.includes('\n')) {
    process.stdout.write(`You are currently in ${colorize(__dirname, 'blueBold')}\n`);
  }
};

export const runPathModule = () => {
  process.stdin.on('data', echoInput);
}
