import { cwd, stdout } from "process";
import fs, { readdir } from "fs";
import path from "path";

import { currentDirectory } from '../currentDirectory.js';

import { ERROR_MESSAGE_OPERATION, ERROR_MESSAGE_INVALID_INPUT } from '../consts.js';

const sort = ( a, b ) => {
    const nameA = a.toLowerCase();
    const nameB = b.toLowerCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
};

const ls = async () => {

    try {
        const directoriesArray = [];
        const filesArray = [];
        const otherArray = [];

        readdir(process.cwd(), async (err, files) => {

            if (err) {
                stdout.write(`Error: ${err.message}\n`);
                stdout.write(ERROR_MESSAGE_INVALID_INPUT);

            } else {

                for (const file of files) {

                    const filePath = path.join(`${cwd()}`, file);

                    try {

                        const stats = await fs.promises.stat(filePath, (err, stats) => {
                            if (err) console.log('err', err);
                            return stats;
                        });

                        if (stats.isDirectory()) directoriesArray.push(`${path.parse(file).name}`);
                        if (stats.isFile()) filesArray.push(`${path.parse(file).name}.${path.extname(file).slice(1)}`);

                    } catch (error) {
                        otherArray.push(`${path.parse(file).name}`);
                    }
                }

            }
            
            directoriesArray.sort((a, b) => sort(a,b));
            filesArray.sort((a, b) => sort(a,b));
            otherArray.sort((a, b) => sort(a,b));

            const filesAllArray = [];

            directoriesArray.forEach((fileName) => filesAllArray.push({ name: fileName, type: 'directory' }));
            filesArray.forEach((fileName) => filesAllArray.push({ name: fileName, type: 'file' }));
            otherArray.forEach((fileName) => filesAllArray.push({ name: fileName, type: 'unknown' }));

            console.table(filesAllArray);

            currentDirectory();
        })
        
    } catch (error) {

        stdout.write(ERROR_MESSAGE_OPERATION);
        currentDirectory();

    }

};

export default ls;