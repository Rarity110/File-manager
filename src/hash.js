import { createHash } from 'crypto';
import fs from 'fs';
import { stdout } from 'node:process';
import { ERROR_MESSAGE_OPERATION, ERROR_MESSAGE_INVALID_INPUT } from './consts.js';
import { currentDirectory } from './currentDirectory.js';
import arg from  './helpers/arg.js';

const getHash = (argument) => {

  try {
    const path = arg(argument);
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        stdout.write(ERROR_MESSAGE_INVALID_INPUT);
        currentDirectory();
      } else {
        const hash = createHash('sha256').update(data).digest('hex');
        stdout.write(hash + '\n');
        currentDirectory();
      }
      
    });
  } catch (error) {
      stdout.write(ERROR_MESSAGE_INVALID_INPUT);
      currentDirectory();
  }
    
}

export default getHash;