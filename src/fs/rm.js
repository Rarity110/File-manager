import { ERROR_MESSAGE_OPERATION, ERROR_MESSAGE_INVALID_INPUT } from '../consts.js';
import { stdout, stderr } from 'node:process';
import fs from 'fs';
import { currentDirectory } from '../currentDirectory.js';
import arg from '../helpers/arg.js';


const rm = async (argument) => {
    const path = arg(argument);
    fs.unlink(path, (err) => {
        if(err) {
            stdout.write(ERROR_MESSAGE_OPERATION);
        } 
        currentDirectory();
    })
};

export default rm;