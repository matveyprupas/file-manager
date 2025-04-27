import process from 'node:process';
import { runPathModule } from './path.js';
import { __dirname } from '../constants.js';

const parsedArgs = process.argv.filter(arg => arg.startsWith("--")).reduce((acc, arg) => {
  const splittedArg = arg.split('=');

  acc[splittedArg[0].substring(2)] = splittedArg[1] ? splittedArg[1] : true
  
  return acc;
}, {});

const echoInput = (chunk) => {
  const chunkStringified = chunk.toString();
  
  if (chunkStringified.includes('.exit')) process.exit(0)
};

export const runFileManager = () => {
  runPathModule();
  const username = parsedArgs.username || 'Username';
  
  process.stdout.write(`Welcome to the File Manager, ${username}!\nYou are currently in ${__dirname}\n`);
  
  process.stdin.on('data', echoInput);
  
  
  process.on ('SIGINT',() => {
    process.exit(0);
  });
  
  process.on('exit', () => {
    process.stdout.write(`\nThank you for using File Manager, ${username}, goodbye!\n`);
  })

}
