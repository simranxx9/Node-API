const express = require('express');
const mongoose = require('mongoose');
const Chat = require('./model/mongo');

const app = express();

const socket = require('socket.io');

//static files
app.use(express.static('public'));

//mongodb
mongoose.connect('mongodb+srv://chat:chat@cluster0-aawa9.mongodb.net/test?retryWrites=true&w=majority',
{ useNewUrlParser: true, useUnifiedTopology: true });

const server = app.listen(3000,function(){
    console.log('Running on the port ...');
})

const io = socket(server);

io.on('connection',function(socket){
    console.log('Connected to the socket');
    
    // callback function to recieve the chat from the frontend and set the connection
    socket.on('chat',function(data){
        new Chat({
            name:data.handle,
            msg:data.message
        }).save().then(chat=>{
            console.log('chat is saved '+chat);
        })
        io.sockets.emit('chat',data);
    })

    // to handle the feedback
    socket.on('broadcast',function(data){
        
        socket.broadcast.emit('broadcast',data);
    })
});