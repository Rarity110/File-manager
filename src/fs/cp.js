import { ERROR_MESSAGE_OPERATION, ERROR_MESSAGE_INVALID_INPUT } from '../consts.js';
import { stdout, stderr } from 'node:process';
import fs from 'fs';
import { currentDirectory } from '../currentDirectory.js';
import argsPair from './helpers.js';
import arg from '../helpers/arg.js';

const cp = async (args) => {
    try {
        const [ filePath, filePathCopy ] = argsPair(args);
        const file = arg(filePath);
        const fileCopy = arg(filePathCopy);
    
        fs.access(fileCopy, fs.F_OK, (err) => {

            if(err) {
                const readStream = fs.createReadStream(file);
                const writeStream = fs.createWriteStream(fileCopy);
                readStream.on('error', () => stderr._write(ERROR_MESSAGE_OPERATION));
                writeStream.on('error', () => stderr._write(ERROR_MESSAGE_OPERATION));
                writeStream.on('finish', () => {
                    stdout._write('\n');
                    currentDirectory();
                });
                readStream.pipe(writeStream);
               
            } else {
                stdout.write(ERROR_MESSAGE_OPERATION,);
                currentDirectory();
            }
        })
    } catch (error) {
        stdout.write(ERROR_MESSAGE_INVALID_INPUT);
        currentDirectory();
    }
   
};

export default cp;