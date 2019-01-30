var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//database connect

// mongoose.connect('mongodb://ishtiak:hridoy242@ds113845.mlab.com:13845/todo');
mongoose.connect('mongodb://test:test@ds127375.mlab.com:27375/todo');

var todoSchema = new mongoose.Schema({
    item : String
});
 
var Todo = mongoose.model('Todo',todoSchema);




// var data = [{item: 'get Milk'},{item: 'Hot Dog'},{item: 'kick ass'}];
var urlencoderParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

    app.get('/todo',function(req,res){
        //get data from mongodb and pass to view
        Todo.find({},function(err,data){
            if(err) throw err;
            res.render('todo',{todos: data});
        });
    });
// here i was !!!!!!!!!!!!!!!!!!!!!!!!!!!   

    app.post('/todo',urlencoderParser,function(req,res){
        // get data from view and add it to mongodb
        var newTodo = Todo(req.body).save(function(err,data){
            if(err) throw err;
            res.json(data);
        });

    });

    app.delete('/todo/:item',function(req,res){
        Todo.find({item : req.params.item.replace(/\-/g,' ')}).remove(function(err,data){
            if(err) throw err;
            res.json(data);
        });
    });
};