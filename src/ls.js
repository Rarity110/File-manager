import { stdout } from "process";
import { readdir } from "fs";
import path from "path";
import fs from "fs";
import { cwd } from 'node:process';
import { fileURLToPath } from 'url';
import { currentDirectory } from './currentDirectory.js';
import { ERROR_MESSAGE_OPERATION, ERROR_MESSAGE_INVALID_INPUT } from './consts.js';

const st = async () => {
    
}

// const chooseFiles = async (file) => {
//     const filePath = path.join(`${cwd()}`, file);
//     const stats = await fs.promises.stat(filePath, (err, stats) => {
//         if (err) throw err;
//         return stats;
//     });
    
//     if (stats.isDirectory()) {
//         return {isDirectoty: `${path.parse(file).name}`};
//     };
//     if (stats.isFile()) {
//        return {isFile: `${path.parse(file).name}.${path.extname(file).slice(1)}`};
//     };
// };

const sort = ( a, b ) => {
    const nameA = a.toLowerCase();
    const nameB = b.toLowerCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
};

const ls = async () => {
    const directoriesArray = [];
    const filesArray = [];
    
    readdir(process.cwd(), async (err, files) => {
    
        if (err) {
        stdout.write(`${err.message}\n`);
        stdout.write(ERROR_MESSAGE_INVALID_INPUT);
        } else {
            
            for (const file of files) {
                const filePath = path.join(`${cwd()}`, file);
                const stats = await fs.promises.stat(filePath, (err, stats) => {
                    if (err) throw err;
                    return stats;
                });
                if (stats.isDirectory()) {
                    directoriesArray.push(`${path.parse(file).name}`);
                };
                if (stats.isFile()) {
                    filesArray.push(`${path.parse(file).name}.${path.extname(file).slice(1)}`);
                };

            }
        
        }
        directoriesArray.sort((a, b) => sort(a,b));
        filesArray.sort((a, b) => sort(a,b));
        const filesAllArray = [];
        directoriesArray.forEach((fileName) => filesAllArray.push({ name: fileName, type: 'directory' }));
        filesArray.forEach((fileName) => filesAllArray.push({ name: fileName, type: 'file' }));
        console.table(filesAllArray);
        currentDirectory();
})
};

export default ls;