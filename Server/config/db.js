import pg from 'pg';

const db = new pg.Client({
    user : 'postgres',
    host : 'localhost',
    database : 'HexonData',
    password : 'Passw0rd',
    port : 5432
})

db.connect();

export default db;