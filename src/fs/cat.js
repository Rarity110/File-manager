import { ERROR_MESSAGE_OPERATION, ERROR_MESSAGE_INVALID_INPUT } from '../consts.js';
import { stdout, stderr } from 'node:process';
import fs from 'fs';
import { currentDirectory } from '../currentDirectory.js';
import arg from '../helpers/arg.js';

const cat = async (argument) => {
    try {
        const filePath = arg(argument);

        fs.access(filePath, fs.F_OK, async (err) => {

            if(err) {
                stderr.write(ERROR_MESSAGE_INVALID_INPUT);
                currentDirectory();
            } else {
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
            }

        })
    } catch (error) {
        stdout.write(ERROR_MESSAGE_INVALID_INPUT);
        currentDirectory();
    }
    
};

export default cat;