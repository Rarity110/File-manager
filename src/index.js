import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output, exit } from 'node:process';

import { firstMessage, lastMessage } from './consts.js';
import { currentDirectory } from './currentDirectory.js';
import { ERROR_MESSAGE_INVALID_INPUT } from './consts.js';

import { cd, ls, cat, add, rn, cp, mv, rm } from './fs/index.js';
import getOsInfo from './os.js';
import getHash from './hash.js';
import { compress, decompress} from './zip/index.js';

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
                cp(args);
                break;
            case 'rm':
                rm(args);
                break;
            case 'mv':
                mv(args);
                break;
            case 'os':
                getOsInfo(args);
                break;
            case 'hash':
                getHash(args);
                break;
            case "compress":
                compress(args);
                break;
            case "decompress":
                decompress(args);
                break;
            case '.exit':
                exit();
            default:
                console.log(ERROR_MESSAGE_INVALID_INPUT);
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