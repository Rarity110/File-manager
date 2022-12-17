import { argv } from 'node:process';

const parseArgs = () => {
    const args = argv.slice(2).toString().trim();
    const userName = args.startsWith('--username') ? args.split('=').pop() : "Anonimus";
    return userName;
};

const username = parseArgs();

const firstMessage = `Welcome to the File Manager, ${username}!` + '\n';
const lastMessage = `Thank you for using File Manager, ${username}, goodbye!`;
const ERROR_MESSAGE_OPERATION = 'Operation failed' + '\n';
const ERROR_MESSAGE_INVALID_INPUT = 'Invalid input' + '\n';

export { username, firstMessage, lastMessage, ERROR_MESSAGE_OPERATION, ERROR_MESSAGE_INVALID_INPUT };