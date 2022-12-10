import { chdir, cwd } from 'node:process';
import { stdout } from 'node:process';
import { currentDirectory } from './currentDirectory.js';
import { ERROR_MESSAGE_OPERATION, ERROR_MESSAGE_INVALID_INPUT } from './consts.js';

const cd = (path) => {
    try {
        chdir(path);
        currentDirectory();
    } catch (err) {
        stdout.write(ERROR_MESSAGE_OPERATION);
        currentDirectory();
    }
};

export default cd;
