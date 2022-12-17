import { ERROR_MESSAGE_OPERATION, ERROR_MESSAGE_INVALID_INPUT } from '../consts.js';
import { stdout, stderr } from 'node:process';
import fs from 'fs';
import { currentDirectory } from '../currentDirectory.js';

const cat = async (filePath) => {

    fs.access(filePath, fs.F_OK, async (err) => {

        if(err) {
            stderr.write(ERROR_MESSAGE_INVALID_INPUT);
            currentDirectory();
        } 

        const readStream = fs.createReadStream(filePath, 'utf-8');
        let data = '';

        readStream.on('data', chunk => data += chunk);

        readStream.on('end', () => {
            stdout.write(data + '\n');
            currentDirectory();
        });

        readStream.on('error', () => {
            stderr._write(ERROR_MESSAGE_OPERATION);
            currentDirectory();
        });
        
    })
};

export default cat;