const pg = require('pg')
const client = new pg.Client('postgres://localhost/gameshop')

const start = async () => {
    await client.connect()
    console.log('connected to database')
    const SQL = `
        DROP TABLE IF EXISTS videogames;
        CREATE TABLE videogames(
            id SERIAL PRIMARY KEY,
            name VARCHAR(100)
        );
    
    `
    await client.query(SQL)
}

start()