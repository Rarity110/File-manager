import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output, exit } from 'node:process';

import { firstMessage, lastMessage } from './consts.js';

const start = async () => {
    const rl = readline.createInterface({ input, output });
    rl.write(firstMessage);

    rl.on('line', (line) => {
        switch (line.trim()) {
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