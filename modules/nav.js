import fsPromises from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { colorize } from '../utils.js';

import { __dirname } from '../constants.js';

async function listDirectory() {
  try {
    let files = await fsPromises.readdir(__dirname);

    // Get file details
    const fileDetails = (await Promise.allSettled(files.map(async file => {
      const fullPath = path.join(__dirname, file);
      const stats = await fsPromises.stat(fullPath);
      return {
        name: file,
        isDirectory: stats.isDirectory(),
        fullPath
      };
    }))).map(result => result.status === 'fulfilled' ? result.value : null).filter(Boolean);

    fileDetails.sort((a) => a.isDirectory ? -1 : 1);
    
    // Display files
    console.log(colorize('Index  Type  Name', 'dim'));
    console.log(colorize('-----  ----  ---------------', 'dim'));
    
    fileDetails.forEach((file, index) => {
      const type = file.isDirectory ? 'DIR ' : 'FILE';
      const typeColored = colorize(type, file.isDirectory ? 'blue' : 'yellow');
      const nameColored = file.isDirectory ? colorize(file.name, 'blueBold') : file.name;
      
      console.log(
        `  ${index}    ${typeColored}  ${nameColored}`
      );
    });
    
  } catch (error) {
    console.error(colorize(`Error: Operation failed`, 'red'));
    // process.exit(1);
  }
}


const echoInput = (chunk) => {
  const chunkStringified = chunk.toString().trim();

  
  if (chunkStringified.startsWith('ls')) {
    listDirectory({
      directory: '.'
    });
  }
};

// Main execution
export const runNavModule = () => {
  process.stdin.on('data', echoInput);
}