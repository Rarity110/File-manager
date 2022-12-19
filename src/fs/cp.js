import { ERROR_MESSAGE_OPERATION, ERROR_MESSAGE_INVALID_INPUT } from '../consts.js';
import { stdout, stderr } from 'node:process';
import fs from 'fs';
import { currentDirectory } from '../currentDirectory.js';
import argsPair from './helpers.js';

const cp = async (args) => {
    try {
        const [ filePath, filePathCopy ] = argsPair(args);
    
        // if (args.indexOf('" "') !== -1) {
        //     const [ pathOld, pathNew ] = args.split('" ');
        //     filePath = pathOld.slice(1);
        //     filePathCopy = pathNew.slice(1, -1);
        // } else if (args.split(' ').length === 2) {
        //     const [ pathOld, pathNew ] = args.split(' ');
        //     filePath = pathOld;
        //     filePathCopy = pathNew;
        // } else {
        //     stdout.write(ERROR_MESSAGE_INVALID_INPUT);
        //     currentDirectory();
        // };
    
    
        fs.access(filePathCopy, fs.F_OK, (err) => {

            if(err) {
                const readStream = fs.createReadStream(filePath);
                const writeStream = fs.createWriteStream(filePathCopy);
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