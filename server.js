// require dependencies
const express = require('express');
const mongoose = require('mongoose');
const Tweet = require('./models/tweet');

// initialize the express app
const app = express();

// connfigure settings
const PORT = 3000;

// connect to and config  mongodb
const DATABASE_URL = 'mongodb+srv://admin:abc1234@cluster0.7o8mj.mongodb.net/tweeter?retryWrites=true&w=majority';

mongoose.connect(DATABASE_URL);

// set up listeners for mongoDB events
// shortcut variable
const db = mongoose.connection; // this is an object that represents our database in this app.
// this object contains info related to db name, db host, db port, and any other relevant info

db.on('connected', ()=>{
    console.log('Connected to MongoDB')
})

db.on('error', (error)=>{
    console.log(`MongoDB Error ${error.message}`)
})

// mouting middleware
app.use(express.urlencoded({ extended: false })); // this creates req.body

// mount routes

// Create route
app.post('/tweets', (req,res) => {
    Tweet.create(req.body, (err, tweet)=>{
        res.send(tweet)
    })
})

// Index route
app.get('/tweets', (req,res) => {
    Tweet.find({}, (err, tweets) =>{
        res.send(tweets)
    })
})

// Show route
app.get('/tweets/:id', (req,res)=>{
    Tweet.findById({_id: req.params.id}, (err, tweet)=>{
        res.send(tweet)
    })
})

// Delete route
app.delete('/tweets/:id', (req, res)=>{
    Tweet.findByIdAndDelete({_id: req.params.id}, (err, tweet)=>{
        res.send(`Deleted: ${tweet}`)
    })
})

// Update route
app.put('/tweets/:id', (req,res)=>{
    Tweet.findByIdAndUpdate({_id: req.params.id}, {body: req.body}, {new: true}, (err, tweet)=>{
        res.send(tweet)
    })
})

// tell app to listen
app.listen(PORT, ()=>{
    console.log(`App listening on port: ${PORT}`)
})