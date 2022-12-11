import { ERROR_MESSAGE_OPERATION, ERROR_MESSAGE_INVALID_INPUT } from './consts.js';
import { rename } from 'node:fs';
import { currentDirectory } from './currentDirectory.js';


const rn = async (path, newName) => {
    rename (path, newName, (err) => {
        if (err) throw new Error(`${ERROR_MESSAGE_OPERATION}`);
    })
    currentDirectory();
};

export default rn;