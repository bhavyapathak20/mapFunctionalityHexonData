import db from "../config/db.js";

async function createUser(userName, userEmail , userHashedPassword){
    const result = await db.query('INSERT INTO users(userName, userEmail, userPassword) VALUES($1, $2, $3) RETURNING *',
        [userName, userEmail, userHashedPassword]
    )

    return result.rows[0];
}

async function findUser(userEmail){
    const result = await db.query('SELECT * FROM users WHERE userEmail = $1', [userEmail]);
    return result.rows[0];
}


export {createUser, findUser};