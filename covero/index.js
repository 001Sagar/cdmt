const express = require('express');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const Article = require('./models/article')

const router = require('./routes/user');

const app = express();
const port = process.env.PORT || 8000;

//connect the mongoDB
const db = require('./config/mongoose');

//view Engine
// app.express(expressLayouts);

// Asstes for Css
app.use(express.static('assets'))

app.set('view engine', 'ejs')

//Rout
app.get('/', async (req,res) =>{
  const article= await Article.find();  
    res.render('index',{article:article});
})
//Body Parser
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//User Routes
app.use('/article',router);


app.listen(port,function(err){
    if(err){
        console.log('Error in connection to the server',err)
    }
    console.log('Server run on port::',port)
})