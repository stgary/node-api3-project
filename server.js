const express = require('express');
const cors = require('cors');

const userRouter = require('./users/userRouter.js');
const postRouter = require('./posts/postRouter.js');

const server = express();

server.use(cors());
server.use(express.json());

server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

server.use(logger);

server.use('/users', userRouter);
server.use('/posts', postRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`method: ${req.method}, url: ${req.url}, time:`, Date.now());
  next();
}

module.exports = server;
