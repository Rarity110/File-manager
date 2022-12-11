import { createHash } from 'crypto';
import fs from 'fs';
import { stdout, stderr } from 'node:process';
import { ERROR_MESSAGE_OPERATION, ERROR_MESSAGE_INVALID_INPUT } from './consts.js';
import { currentDirectory } from './currentDirectory.js';

const getHash = (path) => {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) stdout.write(ERROR_MESSAGE_INVALID_INPUT);
        const hash = createHash('sha256').update(data).digest('hex');
        stdout.write(hash + '\n');
        currentDirectory();
      });

}

export default getHash;