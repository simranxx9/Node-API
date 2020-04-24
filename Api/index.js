var express = require('express');
const Routes = require('./Router/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb+srv://test1:test1@cluster0-aawa9.mongodb.net/test?retryWrites=true&w=majority',
{ useNewUrlParser: true ,useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;

//Static files
app.use(express.static('public'));

//middleware body-parser
app.use(bodyParser.json());

//middleware routes
app.use('/api',Routes);

// next middleware
app.use(function(err,req,res,next){
    res.send({error:err.message})
})


app.listen(process.env.port||3000,function(){
    console.log('running the server on the localhost');
})