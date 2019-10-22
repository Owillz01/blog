const express = require('express');
const bodyParse = require("body-parser");
const mongoose = require('mongoose')


const Post = require('./model/posts')
const app = express();


// database connection done here
    mongoose.connect("mongodb+srv://owillz:XLu5liaLQ1s4eptD@cluster0-hbsbk.mongodb.net/MEan_Blog?retryWrites=true&w=majority")
    .then(()=>{console.log("sucess")})
    .catch(()=>{ console.log('error')})

app.use(bodyParse.json())
app.use(bodyParse.urlencoded({ extended: false }))

app.use((req, res, next) => {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");

    next();
})

app.post("/apis/posts", (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    })
    post.save()
    res.status(201).json({
        MESSAGE: "Post Successful"
    });
    // Post.save()
    

})



app.get("/apis/posts", (req, res, next) => {
    Post.find()
        .then((document) => {
            res.status(200).json({
                message: "seccuess!",
                post: document
            })
        })

})

app.delete("/apis/posts/:id", (req, res, next) =>{
    Post.deleteOne({ _id: req.params.id}).then(result=>{
        console.log(result);
        res.status(200).json({
            message: "Delete succesful"
        })
    })
})


module.exports = app;