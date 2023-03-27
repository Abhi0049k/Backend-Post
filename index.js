const express = require('express');
const {connection} = require('./db');
const { userRouter } = require('./routes/user.routes');
const { postRouter } = require('./routes/post.routes');
const { authorization } = require('./middlewares/authorization.middleware');

const app = express();

app.use(express.json());

app.use('/users', userRouter);

app.use(authorization);

app.use('/posts', postRouter);

app.listen(process.env.port, ()=>{
    connection();
    console.log(`Server is running on port ${process.env.port}`);
})