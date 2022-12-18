import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output, exit } from 'node:process';

import { firstMessage, lastMessage } from './consts.js';
import { currentDirectory } from './currentDirectory.js';

import { cd, ls, cat, add, rn } from './fs/index.js';
// import cd from './fs/cd.js';
// import ls from './fs/ls.js';
// import cat from './fs/cat.js';
// import add from './fs/add.js';
// import rn from './fs/rn.js';
import cp from './cp.js';
import rm from './rm.js';
import mv from './mv.js';
import getOsInfo from './os.js';
import getHash from './hash.js';
// import compress from './compress.js';
// import decompress from './decompress.js';

const start = async () => {
    const rl = readline.createInterface({ input, output });
    rl.write(firstMessage);
    currentDirectory();

    rl.on('line', (line) => {
        const commandLine = line.split(' ')[0];
        const args = line.replace(commandLine, '').trim();
        switch (commandLine) {
            case 'up':
                cd('..');
                break;
            case 'cd':
                cd(args);
                break;
            case 'ls':
                ls();
                break;
            case 'cat':
                cat(args);
                break;
            case 'add':
                add(args);
                break;
            case 'rn':
                rn(args);
                break;
            case 'cp':
                cp(arg1, arg2);
                break;
            case 'rm':
                rm(args);
                break;
            case 'mv':
                mv(arg1, arg2);
                break;
            case 'os':
                getOsInfo(args);
                break;
            case 'hash':
                getHash(args);
                break;
            // case "compress":
            //     compress(arg1, arg2);
            //     break;
            // case "decompress":
            //     decompress(arg1, arg2);
            //     break;
            case '.exit':
                exit();
                // break;
            default:
                // console.log(`Say what? I might have heard '${line.trim()}'`);
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