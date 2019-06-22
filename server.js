const express = require('express');
var bodyParser = require('body-parser')
const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:_Hollybamper109@localhost:3306/new_database');

class Todo extends Sequelize.Model {}
Todo.init({
  title: Sequelize.STRING,
  description: Sequelize.STRING,
  done: Sequelize.STRING
}, { sequelize, modelName: 'todo' });


const app = express();

app.use(bodyParser());

app.get('/todos', (req, res) => {
    Todo.findAll()
        .then((todos) => {
            res.json(todos);
        })
});

app.post('/todos', (req, res) => {
    console.log(req.body)
    console.log(req.headers)
    res.send('Hello World');
    sequelize.sync()
        .then(() => Todo.create(req.body))
});

app.listen(4000, () => {
    console.log('server listening on port 4000');
});