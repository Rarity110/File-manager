import { basename, resolve } from 'path';
import { pipeline } from 'stream/promises';
import fs from 'fs';
import zlib from 'zlib';
import { currentDirectory } from '../currentDirectory.js';
import { cwd, stdout } from 'node:process';
import argsPair from '../fs/helpers.js';
import { ERROR_MESSAGE_OPERATION, ERROR_MESSAGE_INVALID_INPUT } from '../consts.js';

const compress = async (args) => {
    
    try {
        const [ filePath, filePathCopy ] = argsPair(args);
        const pathFile = resolve(cwd(), filePath);
        const basenameFile = basename(pathFile);
        const nameZip = resolve(cwd(), filePathCopy, basenameFile + '.br');

        fs.access(nameZip, fs.F_OK, (err) => {
            
            if(err) {

                pipeline(
                    fs.createReadStream(pathFile),
                    zlib.createBrotliCompress(),
                    fs.createWriteStream(nameZip)
                );
                currentDirectory();

            } else {
                stdout.write('File already exists' + '\n');
                stdout.write(ERROR_MESSAGE_OPERATION);
                currentDirectory();
            }
        })
    } catch (error) {
        stdout.write(ERROR_MESSAGE_INVALID_INPUT);
        currentDirectory();
    }

};

export default compress;