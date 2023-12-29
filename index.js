const pg = require('pg')
const client = new pg.Client('postgres://localhost/gameshop')
const express = require('express')
const app = express()
app.use(express.json())

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
        const SQL = `
        select * from boardgames WHERE id=$1   
        `
        const response = await client.query(SQL, [req.params.id])
        res.send(response.rows)

 
    } catch (error) {
        next(error)
    } 
})
//Delete a videogames
app.delete('/api/videogames/:id', async (req,res,next) => {
    try {
        const SQL = `
        DELETE FROM videogames WHERE id=$1
        `
        const response = await client.query(SQL, [req.params.id])
        res.sendStatus(204)

    } catch (error) {
        next(error)
    }

})
//Delete a boardgames
app.delete('/api/boardgames/:id', async (req,res,next) => {
    try {
        const SQL = `
        DELETE FROM boardgames WHERE id=$1
        `
        const response = await client.query(SQL, [req.params.id])
        res.sendStatus(204)

    } catch (error) {
        next(error)
    }

})
//post videogames
app.post('/api/videogames', async(req,res,next) => {
    try {
        const SQL =`
           INSERT INTO videogames(name)
           VALUES($1)
           RETURNING *
        `
        const response = await client.query(SQL, [req.body.name])
        res.send(response.rows)

    } catch (error) {
        next(error)
    }
})
//post boardgames
app.post('/api/boardgames', async(req,res,next) => {
    try {
        const SQL =`
           INSERT INTO boardgames(name)
           VALUES($1)
           RETURNING *
        `
        const response = await client.query(SQL, [req.body.name])
        res.send(response.rows)

    } catch (error) {
        next(error)
    }
})
//update a single videogame/boardgame
app.put('/api/videogames/:id', async (req,res,next) => {
    try {
       const SQL = `
          UPDATE videogames
          SET name = $1
          WHERE id = $2
          RETURNING *
       `
       const response = await client.query(SQL, [req.body.name, req.params.id])
       res.send(response.rows)
    }catch (error) {
        next(error)
    }
})
app.put('/api/boardgames/:id', async (req,res,next) => {
    try {
       const SQL = `
          UPDATE boardgames
          SET name = $1
          WHERE id = $2
          RETURNING *
       `
       const response = await client.query(SQL, [req.body.name, req.params.id])
       res.send(response.rows)
    }catch (error) {
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