const jwt = require('jsonwebtoken');
const { userModel } = require('../models/user.model');
require('dotenv').config();

const authorization = async (req, res, next)=>{
    const token = req.headers.authorization;
    if(!token){
        res.status(400).send({"msg": "Login first"});
    }else{

        try{
            const decoded = await jwt.verify(token, process.env.secretKey)
            const user = await userModel.find({_id: decoded.userId});
            req.body.userId = decoded.userId;
            if(user.length>0)
            next();
            else
            res.status(400).send({"err": "login first"});
        }catch(err){
            console.log(err.message);
            res.status(400).send({'err': "Something went wrong"});
        }
    }
}

module.exports = {
    authorization
}