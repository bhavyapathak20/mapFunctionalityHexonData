import db from "../config/db.js";

async function insertLocation(userId, name, longitude, latitude){
    const result = await db.query(
        `INSERT INTO locations(user_id, name, longitude, latitude)
         VALUES($1, $2, $3, $4) RETURNING *`,
        [userId, name, longitude, latitude]
    );
    return result.rows[0];
}

async function getUserLocations(userId){
    const result = await db.query(
        `SELECT * FROM locations WHERE user_id = $1`,
        [userId]
    );
    return result.rows;
}

export { insertLocation, getUserLocations };
