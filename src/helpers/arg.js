const arg = (argument) => {
    if (argument[0] === '"' || argument[0] === "'") {
        return argument.slice(1, -1);
    } else { 
        return argument;
    }
};

export default arg;