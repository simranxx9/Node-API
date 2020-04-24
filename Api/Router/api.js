const express = require('express');

const Ninja = require('../model/mongo');

const Routes = express.Router();

Routes.get('/ninja', function(req, res, next){
    console.log(req.query);
    Ninja.aggregate([
    {
        $geoNear: {
            near: {type:'Point',coordinates:[parseFloat(req.query.lng), parseFloat(req.query.lat)]},
            distanceField: "dist.calculated",
            maxDistance: 100000,
            spherical: true
         }
        }
    ]).then(function(result){
        res.send(result);    
    }).catch(next);
});

Routes.post('/ninja',function(req,res,next){
    Ninja.create(req.body).then(function(ninja){
        res.send(ninja);
    }).catch(next);
})

Routes.put('/ninja/:id',function(req,res){
    Ninja.findByIdAndUpdate({_id:req.params.id},req.body).then(function(ninja){
        res.send(ninja);
    }).catch(function(err){
        res.send(err);
    });
})

Routes.delete('/ninja/:id',function(req,res){
    Ninja.findByIdAndRemove({_id:req.params.id}).then(function(ninja){
        res.send(ninja);
    })
})

module.exports = Routes;