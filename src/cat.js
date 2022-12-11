import { ERROR_MESSAGE_OPERATION, ERROR_MESSAGE_INVALID_INPUT } from './consts.js';
import { stdout, stderr } from 'node:process';
import fs from 'fs';

const cat = async (filePath) => {
    fs.access(filePath, fs.F_OK, (err) => {
        if(err) {
            throw new Error(ERROR_MESSAGE_OPERATION)
        } else {
            const readStream = fs.createReadStream(filePath, 'utf-8');
            let data = '';
            readStream.on('data', chunk => data += chunk);
            readStream.on('end', () => stdout.write(data + '\n'));
            readStream.on('error', () => stderr._write(ERROR_MESSAGE_OPERATION));
        }
    })
};

export default cat;