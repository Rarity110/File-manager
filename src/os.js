import os from "os";
import { cwd, stdout, stderr } from 'node:process';
import { currentDirectory } from './currentDirectory.js';
import { ERROR_MESSAGE_OPERATION, ERROR_MESSAGE_INVALID_INPUT } from './consts.js';

const res = (content) => {
    stdout._write(content);
    currentDirectory();
}

const cpus = () => {
    const cpus = os.cpus();
     
    const res = [];
    cpus.forEach(el => {
        const info = el.model.split(' @ ');
        res.push({model: info[0], clock_rate: info[1]});
    })
    stdout._write(`Overall amount of CPUS ${res.length}.`+ '\n');
    console.table(res);
    currentDirectory();
}

const getOsInfo = (method) => {
    // console.log(os);
    switch (method) {
        case '--EOL':
            res(`${os.EOL}\n`);
            break;
        case '--cpus':
            cpus(); 
            break;
        case '--homedir':
            res(`${os.homedir}\n`);
            break;
        case '--username':
            const userInfo = os.userInfo();
            res(`${userInfo.username}\n`);
            break;
        case '--architecture':
            res(`${os.arch()}\n`);
            break;
        default:
            console.log(ERROR_MESSAGE_INVALID_INPUT);
            currentDirectory();
            break;
    }
};

export default getOsInfo;