import bcrypt, { genSalt } from 'bcrypt';

async function hashPassword(password){
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

async function comparePassword(inputPass, storedPass){
    return await bcrypt.compare(inputPass, storedPass);
}

export {hashPassword, comparePassword};


