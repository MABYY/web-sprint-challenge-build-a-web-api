// Write your "actions" router here!
const { restart } = require("nodemon");
const router = require('express').Router();
const Actions = require('./actions-model');
const {
    validateActionId,
    // validateUser,
    // validatePost
} = require('./actions-middlware')

// router.get('/', (req, res) => {
//     res.send('ACTIONS!!!! router connected.');
// });

router.get('/', async (req, res,next) =>{
    
    try{
        const actions = await Actions.get()
        // throw new Error('WOOW')
        res.status(200).json(actions);
        
    } catch(next) {
        // next(error) // we are sending the error to the NEAREST error handling MW function
        //next() // -> it sends the req and the res to the next MW fc in the pipeline
        //res.status(500).json({
         //   message: "Error message",
        // });
    }
});

router.get('/:id', validateActionId, async (req,res,next) => {
    res.status(200).json(req.action)
    // try {
    //     const { id } = req.params
    //     const action = await Actions.get(id)

    //     if (action)  {
    //         res.status(200).json(action)
    //     } else {
    //         res.status(404).json({
    //             message:"The action with the specified ID does not exist",
    //         })
    //     }

    // } catch (next) {
    // //         res.status(500).json({
    // //         message:"The action information could not be retrieved",
    // //     })
        
    // }
})



router.post('/', async (req, res) =>{
    try{ 
        if(!req.body) {
            res.status(400).json({
                message:"Please provide complete post",
            })
        } else {
            const makePost = await Actions.insert(req.body);
            res.status(201).json(makePost)
        }  
    } catch(next) {
        // res.status(500).json({
        //     message: "There was an error while saving the post to the database",
        // });
    }
});


router.delete('/:id', validateActionId,async (req,res,next) => {
    try{
        const remAction = await Actions.remove(req.params.id)
        res.status(200).json({message: " The action was removed"})
      } catch(next) {
      }


    // try {
    //     // const { id } = req.params.id 
    //      const remAction = await Actions.get(req.params.id )
    //      if (!remAction) {
    //          res.status(404).json({
    //              message:"The action with the specified ID does not exist",
    //          })
    //      } else {
    //          await Actions.remove(req.params.id)
    //          res.status(200).json(remAction)
    //      }

    // } catch (error) {
    //     //     res.status(500).json({
    //     //     message:"The project could not be removed",
    //     // })    
    // }
})

router.put('/:id', validateActionId, async (req,res,next) => {
    try {
         const {id, project_id, description, notes, completed} = req.body
        if(!id || !project_id || !description || !notes) {
            res.status(400).json({
                message:"Please provide title and contents for the project",
            }) 
        } else {
            // const { id } = req.params
            // const action = await Actions.get(id)

            // if(!action){
            //     res.status(404).json({
            //         message: "The post with the specified ID does not exist"
            //     })
            // } else {
                await Actions.update(req.params.id, req.body)
                res.status(200).json(req.action)
            // }

        }

    } catch (next) {
        //     res.status(500).json({
        //     message:"The post information could not be modified",
        // })
        
    }
})

router.use((err,req,res,next)=>{
    res.status(err.status).json({
        messageTailor: "Wrong path",
        message: err.message,
        stack: err.stack,
    })
})

module.exports = router;