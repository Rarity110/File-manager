import { ERROR_MESSAGE_OPERATION, ERROR_MESSAGE_INVALID_INPUT } from '../consts.js';
import { stdout, stderr } from 'node:process';
import fs from 'fs';
import { currentDirectory } from '../currentDirectory.js';
import rm from './rm.js';
import argsPair from './helpers.js';

const mv = async (args) => {

    try {
        const [ filePath, filePathCopy ] = argsPair(args);

        fs.access(filePathCopy, fs.F_OK, (err) => {
            
            if(err) {
                const readStream = fs.createReadStream(filePath);
                const writeStream = fs.createWriteStream(filePathCopy);
                readStream.on('error', () => {
                    stdout._write(ERROR_MESSAGE_OPERATION);
                    currentDirectory();
                });
                writeStream.on('error', () => {
                    stdout._write(ERROR_MESSAGE_OPERATION);
                    currentDirectory();
                });
                writeStream.on('finish', () => {
                    stdout._write('\n');
                    rm(filePath);
                    currentDirectory();
                });
                readStream.pipe(writeStream);
               
            } else {
                stdout._write(ERROR_MESSAGE_OPERATION);
            }
        })
    } catch (error) {
        stdout.write(ERROR_MESSAGE_INVALID_INPUT);
        currentDirectory();
    }

   
};

export default mv;