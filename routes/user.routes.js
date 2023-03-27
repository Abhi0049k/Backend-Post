const express = require('express');
const bcrypt = require('bcrypt');
require('dotenv').config();
const { userModel } = require('../models/user.model');
const jwt = require('jsonwebtoken');

const userRouter = express.Router();

userRouter.post('/register', async (req, res) => {
    const data = req.body;
    const saltRounds = 5;
    try {
        data.password = await bcrypt.hash(data.password, saltRounds);
        const newUser = new userModel(data);
        await newUser.save();
        res.status(200).send({ "msg": "new user added" });
    } catch (err) {
        console.log(err.message);
        res.status(400).send({
            "msg": "User already exist, please login"
        })
    }
})

userRouter.post('/login', async (req, res) => {
    let data = req.body;
    try {
        let user = await userModel.findOne({ email: data.email });
        let result = await bcrypt.compare(data.password, user.password)
        if (result) {
            res.status(200).send({ "msg": "Successful Login", "token": jwt.sign({ 'userId': user._id }, process.env.secretKey) })
        } else {
            res.status(400).send({ "msg": "wrong Credentails" });
        }
    } catch (err) {
        res.status(400).send({ "err": "Something went wrong" })
    }
})

module.exports = {
    userRouter
}