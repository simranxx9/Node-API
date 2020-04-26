const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name:String,
    msg:String
})

const chat = mongoose.model('chat',Schema);

module.exports = chat;