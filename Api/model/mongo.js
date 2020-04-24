const mongoose = require('mongoose');

 const GeoSchema = new mongoose.Schema({
     type:{
         type:String,
         default:"Point"
     },
     coordinates:{
        type:[Number],
        index:"2dsphere"
     }
 }) 

const Schema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is must']
    },
    belt:{
        type:String
    },
    available:{
        type:Boolean,
        default:false
    },
    geometry:GeoSchema
})

const Ninja = mongoose.model('ninjas',Schema);

module.exports = Ninja;