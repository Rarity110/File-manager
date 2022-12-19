import { basename, resolve } from 'path';
import { pipeline } from 'stream/promises';
import fs from 'fs';
import zlib from 'zlib';
import { currentDirectory } from '../currentDirectory.js';
import { cwd, stdout } from 'node:process';
import argsPair from '../fs/helpers.js';
import { ERROR_MESSAGE_OPERATION, ERROR_MESSAGE_INVALID_INPUT } from '../consts.js';

const decompress = async (args) => {
    try {

        const [ filePath, filePathCopy ] = argsPair(args);

        const pathFileZip = resolve(cwd(), filePath);
        const fileName = basename(pathFileZip).replace('.br', '');
        const pathNewFile = resolve(cwd(), filePathCopy, fileName);

        fs.access(pathNewFile, fs.F_OK, (err) => {
            
            if(err) {

                fs.access(filePathCopy, fs.F_OK, (err) => {
                    if(err) {
                        stdout.write(ERROR_MESSAGE_INVALID_INPUT);
                        currentDirectory();
                        
                    } else {
                        pipeline(
                            fs.createReadStream(pathFileZip),
                            zlib.createBrotliDecompress(),
                            fs.createWriteStream(pathNewFile)
                        );
        
                        currentDirectory();
                    }
                })
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

export default decompress;