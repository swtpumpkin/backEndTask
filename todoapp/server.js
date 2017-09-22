// npm install express@3
// npm install mongoose

var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/test');

app.configure(function() {
    app.use(express.static(__dirname + '/public'));
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
});

var Todo = mongoose.model('Todo', {
    text : String,
    done : Boolean
});

app.get('/todos', function(req, res) {
    Todo.find(function(err, todos) {
        if (err) res.send(err);
        res.json(todos);
    });
});

function getTodos(cb) {
    Todo.find(function(err, todos) {
        cb(todos);
    });
}

app.post('/todos', function(req, res) {
    Todo.create({
        text : req.body.text,
        done : false
    }, function(err, todo) {
        if (err) res.send(err);
        // Todo.find(function(err, todos) {
        //     if (err) res.send(err);
        //     res.json(todos);
        // });
        getTodos(function(todos) {
            res.json(todos);
        });
    });
});

app.delete('/todos/:todo_id', function(req, res) {
    Todo.remove({
        _id : req.params.todo_id
    }, function(err, todo) {
        if (err) res.send(err);
        // Todo.find(function(err, todos) {
        //     if (err) res.send(err);
        //     res.json(todos);
        // });
        getTodos(function(todos) {
            res.json(todos);
        });
    });
});

app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
});

app.listen(port);
console.log("App listening on port " + port);
