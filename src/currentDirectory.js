import { cwd } from 'node:process';

const currentDirectory = `You are currently in ${cwd()}`+ '\n';

export { currentDirectory };