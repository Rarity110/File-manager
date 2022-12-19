import { stdout } from 'node:process';
import { currentDirectory } from  '../currentDirectory.js';

const argsPair = (args) => {
    let filePath;
    let filePathCopy;

    if (args.indexOf('" "') !== -1) {
        const [ pathOld, pathNew ] = args.split('" ');
        filePath = pathOld.slice(1);
        filePathCopy = pathNew.slice(1, -1);
    } else if (args.split(' ').length === 2) {
        const [ pathOld, pathNew ] = args.split(' ');
        filePath = pathOld;
        filePathCopy = pathNew;
    } else {
        stdout.write(ERROR_MESSAGE_INVALID_INPUT);
        currentDirectory();
    };

    return [filePath, filePathCopy]
};

export default argsPair;