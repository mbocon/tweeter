// require dependencies
const mongoose = require('mongoose');

// Define a mongoose Schema

const tweetSchema = new mongoose.Schema({
    title: String,
    body: String,
    author: String,
    likes: { type: Number, default: 0 },
    sponsored: { type: Boolean, default: false },
}, { timestamps: true })

// Compile mongoose Schema into a mongoose model
// Use mongoose model methods to perform CRUD data operations on a mongoDB collection
/*
    Tweet.create()
    Tweet.find()
    Tweet.findById()
    Tweet.findOne()
    Tweet.findByIdAndUpdate()
    Tweet.findByIdAndDelete()
*/
// Export Tweet model so it can be used in our controllers
module.exports = mongoose.model('Tweet', tweetSchema)




