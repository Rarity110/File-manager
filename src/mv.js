import { ERROR_MESSAGE_OPERATION, ERROR_MESSAGE_INVALID_INPUT } from './consts.js';
import { stdout, stderr } from 'node:process';
import fs from 'fs';
import { currentDirectory } from './currentDirectory.js';
import rm from './rm.js';

const mv = async (filePath, filePathCopy) => {
    fs.access(filePathCopy, fs.F_OK, (err) => {
        
        if(err) {
            const readStream = fs.createReadStream(filePath);
            const writeStream = fs.createWriteStream(filePathCopy);
            readStream.on('error', () => stderr._write(ERROR_MESSAGE_OPERATION));
            writeStream.on('error', () => stderr._write(ERROR_MESSAGE_OPERATION));
            writeStream.on('finish', () => {
                stdout._write('\n');
                rm(filePath);
            });
            readStream.pipe(writeStream);
           
        } else {
            throw new Error(ERROR_MESSAGE_OPERATION)
        }
    })
};

export default mv;