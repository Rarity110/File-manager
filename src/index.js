import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output, exit } from 'node:process';

import { firstMessage, lastMessage } from './consts.js';
import { currentDirectory } from './currentDirectory.js';

import cd from './cd.js';
import ls from './ls.js';
import cat from './cat.js';
import add from './add.js';
import rn from './rn.js';
import cp from './cp.js';
import rm from './rm.js';
import mv from './mv.js';
import getOsInfo from './os.js';

const start = async () => {
    const rl = readline.createInterface({ input, output });
    rl.write(firstMessage);
    currentDirectory();

    rl.on('line', (line) => {
        const [ commandLine, arg1, arg2 ] = line.split(' ');
        switch (commandLine) {
            case 'up':
                cd('..');
                break;
            case 'cd':
                cd(arg1);
                break;
            case 'ls':
                ls();
                break;
            case 'cat':
                cat(arg1);
                break;
            case 'add':
                add(arg1);
                break;
            case 'rn':
                rn(arg1, arg2);
                break;
            case 'cp':
                cp(arg1, arg2);
                break;
            case 'rm':
                rm(arg1);
                break;
            case 'mv':
                mv(arg1, arg2);
                break;
            case 'os':
                getOsInfo(arg1);
                break;
            case '.exit':
                exit();
                // break;
            default:
                console.log(`Say what? I might have heard '${line.trim()}'`);
                break;
        }
        rl.prompt();
      }).on('close', () => {
        process.exit();
      });
}

process.on('exit', (code) => {
    console.log(lastMessage);
});

await start();