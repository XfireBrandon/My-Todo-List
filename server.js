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
        const {rows} = await pool.query('INSERT INTO todos (todo) VALUES ($1) RETURNING *', [todo])
        res.send(rows)
    } catch (err){
        res.send (err.message) 
    }
})

app.patch('/todo/patch/:id', async (req,res) => {
    const {id} = req.params
    const {todo} = req.body
    try {
        const {rows} = await pool.query('UPDATE todos SET todo = $1 WHERE id = $2 RETURNING *', [todo, id])
    } catch (err) {
        res.send(err.message)
    }
    
})

// app.delete('/todo', async (req,res) => {
//     const {id} = req.body
//     try {
//         const {rows} = await pool.query('DELETE FROM todos WHERE id > 0')
//         res.send(rows)
//     } catch (err) {
//         res.send(err.message)
//     }
   
// })

app.delete('/todo/:id', async (req,res) => {
    const {id} = req.params
    try {
        const {rows} = await pool.query('DELETE FROM todos WHERE id = $1', [id])
        res.send(rows)
    } catch (err) {
        res.send(err.message)
    }
   
})

app.listen(port, () => {
    console.log('Listening on port:' + port)
})