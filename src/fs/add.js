import { ERROR_MESSAGE_OPERATION, ERROR_MESSAGE_INVALID_INPUT } from '../consts.js';
import { cwd, stdout, stderr } from 'node:process';
import fs from 'fs';
import { writeFile } from 'node:fs/promises';
import { currentDirectory } from '../currentDirectory.js';


const add = async (path) => {

    const filePath = `${cwd()}/${path}`;

    fs.access(filePath, fs.F_OK, (err) => {

        if (err) {

            fs.open(filePath, 'w', (err) => {
                writeFile(filePath, '');
            });
            currentDirectory();

        } else {

            stderr.write('Such file already exists' + '\n');
            stderr.write(ERROR_MESSAGE_OPERATION);
            currentDirectory();
        }
      })
};

export default add;