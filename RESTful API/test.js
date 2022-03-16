const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const port = 3000

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/testDB'); 
const postSchema = new mongoose.Schema({
    userId: Number,
    id: Number,
    title: String,
    body:String
})

const Post = new mongoose.model("Post", postSchema);

app.route("/posts")
.get((req, res) => {
  Post.find({}, function (err, postsFound) {
      if(!err){
          res.send(postsFound);;
      }else{
          res.send(err)
      }
  });
})
.post(function (req,res) {
    const post = new Post({
        userId: req.body.userId,
        id: req.body.id,
        title:req.body.title,
        body: req.body.body
    })
    post.save(function (err) {
        if(!err){
            res.send("Post Successfully Added");
        }else{
            res.send(err);
        }
    })
})
.delete(function (req, res) {
    Post.deleteMany({}, function (err) {
        if(!err){
            res.send("Successfully deleted all posts");
        }else{
            res.send(err);
        }
    })
});

app.route("/posts/:userId")
.put(function (req,res) {
    Post.replaceOne(
        {userId: req.params.userId},
        {userId:req.body.userId, id: req.body.id, title: req.body.title, body:req.body.body},
        function (err) {
            if (!err) {
                res.send("Succeful PUT request");
            }else{
                res.send(err);
            }
        })
})
.patch(function (req, res) {
    Post.updateOne( 
        {userId: req.params.userId},
        {title: req.body.title, body:req.body.body},
        function (err) {
            if (!err) {
                res.send("Succeful PATCH request");
            }else{
                res.send(err);
            }
        })
})
.delete(function (req, res) {
    Post.deleteOne({userId: req.params.userId}, function (err) {
        if(!err){
            res.send("Successfully deleted the corresponding post");
        }else{
            res.send(err);
        }
    })
});




app.listen(port, () => {
  console.log(`Test app listening on port ${port}`)
})