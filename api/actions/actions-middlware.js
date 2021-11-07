// add middlewares here related to actions
const Actions = require('../actions/actions-model');


function logger(req, res, next) {
    const timeStamp = new Date()
    console.log(req.method, req.originalUrl, timeStamp)
    next() // send response to the client or call next
  }

async function validateActionId (req,res,next) {
    try{
        const action = await Actions.get(req.params.id)
        if(action) {
            req.action = action
            next()
        } else{
            next({
                status:404,
                message: "Action not found"
            })
        }
    } catch(error) {
        next(error)
    }
}

  module.exports = {
    validateActionId,
    logger,
  }