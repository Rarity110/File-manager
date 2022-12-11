import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output, exit } from 'node:process';

import { firstMessage, lastMessage } from './consts.js';
import { currentDirectory } from './currentDirectory.js';

import cd from './cd.js';
import ls from './ls.js';
import cat from './cat.js';
import add from './add.js';

const start = async () => {
    const rl = readline.createInterface({ input, output });
    rl.write(firstMessage);
    currentDirectory();

    rl.on('line', (line) => {
        const [ commandLine, arg ] = line.split(' ');
        switch (commandLine) {
            case 'up':
                cd('..');
                break;
            case 'cd':
                cd(arg);
                break;
            case 'ls':
                ls();
                break;
            case 'cat':
                cat(arg);
                break;
            case 'add':
                cat(arg);
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