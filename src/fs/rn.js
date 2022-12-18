import { ERROR_MESSAGE_OPERATION, ERROR_MESSAGE_INVALID_INPUT } from '../consts.js';
import { rename } from 'node:fs';
import { currentDirectory } from '../currentDirectory.js';
import { stdout } from 'node:process';


const rn = async (args) => {
    try {
        let path;
        let newName;

        if (args.indexOf('" "') !== -1) {
            const [ pathOld, pathNew ] = args.split('" ');
            path = pathOld.slice(1);
            newName = pathNew.slice(1, -1);
        } else if (args.split(' ').length === 2) {
            const [ pathOld, pathNew ] = args.split(' ');
            path = pathOld;
            newName = pathNew;
        } else {
            stdout.write('1', ERROR_MESSAGE_INVALID_INPUT);
            currentDirectory();
        };

        rename (path, newName, (err) => {
            console.log(path, newName);
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