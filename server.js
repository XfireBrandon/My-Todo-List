const express = require('express');
const app = express();
const port = 8000;
const {Pool} = require('pg')
const pool = new Pool ({
    user: 'brandonmartin',
    password: '',
    host: 'localhost',
    port: 5432,
    database: 'TodoListDB'
})

app.use(express.static('public'))

app.use(express.json())

app.get('/todo', async (req,res) => {
    try {
        const {rows} = await pool.query('SELECT * FROM todos')
        res.send(rows)
    } catch (err) {
        res.send(err.message)
    }
    
})

app.post('/todo/post', async (req,res) => {
    const {todo} = req.body
    try {
        const {rows} = await pool.query('INSERT INTO todos (todo) VALUES ($1)', [todo])
        res.send(rows)
    } catch (err){
        res.send (err.message) 
    }
})

app.patch('/todo/patch/:id', async (req,res) => {
    
})

app.delete('/todo', async (req,res) => {
   
})


app.listen(port, () => {
    console.log('Listening on port:' + port)
})