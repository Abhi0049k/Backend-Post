const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: String,
    body: String,
    device: {type: String, enum: ["Laptop", "Tablet", "Mobile"]},
    no_of_comments: Number,
    userId: String
})

const postModel = mongoose.model('post', postSchema);

module.exports = {
    postModel
}
