const parseArgs = () => {
    const args = process.argv.slice(2).toString().trim();
    const userName = args.startsWith('--username') ? args.split('=').pop() : "Anonimus";
    return userName;
};

const username = parseArgs();

const firstMessage = `Welcome to the File Manager, ${username}!` + '\n';
const lastMessage = `Thank you for using File Manager, ${username}, goodbye!`;

export { username, firstMessage, lastMessage };