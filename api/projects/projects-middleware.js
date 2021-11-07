// add middlewares here related to projects

// add middlewares here related to projects
const Projects = require('../projects/projects-model');


function logger(req, res, next) {
    const timeStamp = new Date()
    console.log(req.method, req.originalUrl, timeStamp)
    next() // send response to the client or call next
  }

async function validateProjectId (req,res,next) {
    try{
        const project = await Projects.get(req.params.id)
        if(project) {
            req.project = project
            next()
        } else{
            next({
                status:404,
                message: "project not found"
            })
        }
    } catch(error) {
        next(error)
    }
}

  module.exports = {
    // validatePo,
    // validateUser,
    validateProjectId,
    logger,
  }