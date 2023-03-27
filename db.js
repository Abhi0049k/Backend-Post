const mongoose = require('mongoose');
require('dotenv').config();

const connection = async () =>{
    try{
        await mongoose.connect(`${process.env.mongoDbUrl}`);
        console.log('Connection Established');
    }catch(err){
        console.log("Something went wrong!!!");
    }
}

module.exports = {
    connection
}
