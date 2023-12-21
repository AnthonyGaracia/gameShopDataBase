const pg = require('pg')
const client = new pg.Client('postgres://localhost/gameshop')
const express = require('express')
const app = express()

const start = async () => {
    await client.connect()
    console.log('connected to database')
    const SQL = `
        DROP TABLE IF EXISTS videogames;
        DROP TABLE IF EXISTS boardgames;

        CREATE TABLE boardgames(
            id SERIAL PRIMARY KEY,
            name VARCHAR(100)
        );
        INSERT INTO boardgames (name) VALUES ('Monopoly');
        INSERT INTO boardgames (name) VALUES ('Battleship');
        INSERT INTO boardgames (name) VALUES ('Chess');
        
        CREATE TABLE videogames(
            id SERIAL PRIMARY KEY,
            name VARCHAR(100)
        );
        INSERT INTO videogames (name) VALUES ('Super MArio Bros');
        INSERT INTO videogames (name) VALUES ('The Legend of Zelda');
        INSERT INTO videogames (name) VALUES ('Excitebike');
    
    `
    await client.query(SQL)
    console.log("table created")

    const port = process.env. PORT || 3000;
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    }) 
}

start()