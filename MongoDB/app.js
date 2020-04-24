const express = require('express');
const bodyParser = require('body-parser');
const controlTodo = require('./controller/controlTodo');


const app = express();
app.set('view engine','ejs');

app.use(express.static('public'));

controlTodo(app);

app.listen(3000);
