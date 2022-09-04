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
    
})

app.post('/todo', async (req,res) => {
    
})

app.patch('/todo', async (req,res) => {
    
})

app.delete('/todo', async (req,res) => {
   
})


app.listen(port, () => {
    console.log('Listening on port:' + port)
})