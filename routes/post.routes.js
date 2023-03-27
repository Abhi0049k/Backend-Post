const express = require('express');
const { postModel } = require('../models/post.model');
require('dotenv').config();


const postRouter = express.Router();

postRouter.get('/', async (req, res) => {
    try {
        const data = await postModel.find(req.query);
        res.status(200).send(data);
    } catch (err) {
        res.status(400).send({ "err": "something went wrong" });
    }
})


postRouter.post('/add', async (req, res) => {
    const data = req.body;
    try {
        const newPost = new postModel(data);
        await newPost.save();
        res.status(200).send({ "msg": "Post Added successfully" });
    } catch (err) {
        res.status(400).send({ "err": "Something went wrong" });
    }
})

postRouter.patch('/update/:id', async (req, res) => {
    const data = req.body;
    const postId = req.params;
    try {
        await postModel.findByIdAndUpdate({ _id: postId.id }, data);
        res.status(200).send({ "msg": "changes Made" });
    } catch (err) {
        res.status(400).send({ "err": "Something went wrong" });
    }
})

postRouter.delete('/delete/:id', async (req, res) => {
    const postId = req.params;
    try {
        await postModel.findByIdAndDelete({ _id: postId.id });
        res.status(200).send({ "msg": "post deleted" });
    } catch (err) {
        res.status(400).send({ "err": "Something went wrong" });
    }
})


module.exports = {
    postRouter
}