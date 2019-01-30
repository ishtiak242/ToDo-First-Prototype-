var express = require('express');
var app = express();
var todoController = require('./controllers/todoControllers');


app.set('view engine','ejs');

app.use(express.static('./public'));

todoController(app);



app.listen(3000);
console.log('i am listening in 3000');