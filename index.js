const pg = require('pg')
const client = new pg.Client('postgres://localhost/gameshop')
const express = require('express')
const app = express()
//all videogames
app.get('/api/videogames', async (req,res,next) => {
    try {
        const SQL = `
            SELECT *
            FROM videogames
        `
        const response = await client.query(SQL)
        res.send(response.rows)

    } catch (error) {
        next(error)
    }
})
//all boardgames
app.get('/api/boardgames', async (req,res,next) => {
    try {
        const SQL = `
            SELECT *
            FROM boardgames
        `
        const response = await client.query(SQL)
        res.send(response.rows)

    } catch (error) {
        next(error)
    }
})
//single videogame
app.get('/api/videogames/:id' , async (req,res,next) =>{
    try{
        console.log(req.params.id)
        const SQL = `
        select * from videogames WHERE id=$1   
        `
        const response = await client.query(SQL, [req.params.id])
        res.send(response.rows)

 
    } catch (error) {
        next(error)
    } 
})
//single boardgames
app.get('/api/boardgames/:id' , async (req,res,next) =>{
    try{
        console.log(req.params.id)
        const SQL = `
        select * from boardgames WHERE id=$1   
        `
        const response = await client.query(SQL, [req.params.id])
        res.send(response.rows)

 
    } catch (error) {
        next(error)
    } 
})

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