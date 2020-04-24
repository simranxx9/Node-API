const bodyParser = require('body-parser');
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://test:test@cluster0-aawa9.mongodb.net/test?retryWrites=true&w=majority')
// let data=[{item:'Buy Milk'},{item:'Hack it'},{item:'You winner'}]

var todoSchema = new mongoose.Schema({
  item:String,
  
})
var Todo = mongoose.model('Todo',todoSchema);
console.log(Todo);

var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app){

  app.get('/todo',function(req,res){
    Todo.find({},function(err,data){
      if (err) throw err;
      res.render('todo',{todos:data});
    })

  })


app.post('/todo',urlencodedParser,function(req,res){
  //get the data from the view and add it to the mongodb
  var newTodo = Todo(req.body).save(function(err,data){
    console.log(req.body);
    if(err) throw err;
    res.json(data);
  })
})

app.delete('/todo/:item',function(req,res){
  //delete item from mongodb
  // console.log(Todo.item._id);
  Todo.find({item:req.params.item.replace(/\+/g," ")}).remove(function(err,data)
  {
    if(err) throw err;
    res.json(data);

  })

})


}
