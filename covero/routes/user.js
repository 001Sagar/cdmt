const { Router } = require('express');
const express = require('express');
const Article = require('../models/article');
const router = express.Router();

router.get('/new', (req,res) =>{
    res.render('article/form')
})

router.post('/', (req,res) =>{
   const article = new Article({
    title:req.body.title,
    desc:req.body.desc,
    info:req.body.info
   })
   article.save().then(()=>{
    res.redirect('/')
   })
})
router.get('/',(req,res)=>{
   Article.find({},function(err,data){
       if(err){
        console.log('err',err);
       }
       console.log(data);
      return res.render('index',{data:data});
   }) 
})
//delete API
router.get('/delete/:id',(req ,res) =>{
   console.log(req.params.id);
 Article.findById(req.params.id , function(err,data){
   if(err){
      console.log('err',err);
     }
     data.remove();
     return res.redirect('back');
 })
})




module.exports = router;