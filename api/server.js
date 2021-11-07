const express = require('express');
const server = express();
const {logger} = require('./actions/actions-middlware');
const cors = require("cors")
const helmet = require("helmet")
const morgan = require('morgan')

const projectsRouter = require('./projects/projects-router');
const actionsRouter = require('./actions/actions-router');

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!



server.use(express.json()) // teaches express to parse req.body
server.use(logger);
server.use(cors()) // MW function: enable cross origin requerests to be displayed to the user 
server.use(helmet()) // MW function: security related headers added to the response
//server.use(morgan()) // alternative logger middleware

server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

server.get('/', (req, res) => {
    res.send(`<h2>Sprint 1!</h2>`);
  });


server.use('*', (req,res)=> {
    res.status(500).json({
        message: "Incorrect path"
    })
})

module.exports = server;

// https://developer.okta.com/blog/2018/09/13/build-and-understand-express-middleware-through-examples