var express= require('express');
var router=express.Router();
var Shout=require('../models/shout');
router.post('/',function(req,res,next){
    var shout=new Shout({
        user:req.body.user,
        content:req.body.content

    });
    shout.save(function(err,result){
        if(err){
            return res.status(404).json({
                title:'eroare',
                error:err
            });
        }
        res.status(201).json({
            message:'saved message',
            obj:result
        });
    });
});

router.get('/',function (req,res,next) {
    Shout.find().exec(function (err,docs) {
        if(err){
            return res.status(404).json({
                title:'eroare',
                error:err
            });
        }
        res.status(200).json({
            message:'Success',
            obj:docs
        });
    });
});

module.exports=router;