import { cwd, stdout } from 'node:process';

const currentDirectory = () => {
    stdout.write(`You are currently in ${cwd()}`+ '\n');
};

export { currentDirectory };