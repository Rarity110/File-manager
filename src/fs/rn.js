import { ERROR_MESSAGE_OPERATION, ERROR_MESSAGE_INVALID_INPUT } from '../consts.js';
import { rename } from 'node:fs';
import { currentDirectory } from '../currentDirectory.js';
import { stdout } from 'node:process';
import argsPair from './helpers.js';
import arg from '../helpers/arg.js';

const rn = async (args) => {
    try {
        const [ filePath, filePathCopy ] = argsPair(args);
        const file = arg(filePath);
        const fileCopy = arg(filePathCopy);

        rename (file, fileCopy, (err) => {
            if (err) {
                stdout.write(ERROR_MESSAGE_INVALID_INPUT);
            };
            currentDirectory();
        });
    } catch (error) {
        stdout.write(ERROR_MESSAGE_INVALID_INPUT);
        currentDirectory();
    }
};

export default rn;