import { ERROR_MESSAGE_OPERATION, ERROR_MESSAGE_INVALID_INPUT } from './consts.js';
import { cwd, stdout, stderr } from 'node:process';
import fs from 'fs';
import { writeFile } from 'node:fs/promises';


const add = async (path) => {
    const filePath = `${cwd()}/${path}`;
    console.log(filePath);
    fs.access(filePath, fs.F_OK, (err) => {

        if (err) {

            fs.open(filePath, 'w', (err) => {
                writeFile(filePath, '');
            });

        } else {

            throw new Error('Such file already exists');

        }
      })
};

export default add;