// Write your "projects" router here!
const { restart } = require("nodemon");
const router =require('express').Router();
const Projects = require('./projects-model');
const {
    validateProjectId
} = require('./projects-middleware')

router.get('/', async (req, res,next) =>{
    try{
        const projects = await Projects.get()
        res.status(200).json(projects);
    } catch(next) {
        // res.status(500).json({
        //     message: "Error message",
        // });
    }
});

router.get('/:id',validateProjectId, async (req,res,next) => {
    res.status(200).json(req.project)

    // try {
    //     const { id } = req.params
    //     const project = await Projects.get(id)

    //     if (project)  {
    //         res.status(200).json(project)
    //     } else {
    //         res.status(404).json({
    //             message:"The post with the specified ID does not exist",
    //         })
    //     }

    // } catch (next) {
    //     //     res.status(500).json({
    //     //     message:"The post information could not be retrieved",
    //     // })
        
    // }
})

router.put('/:id', validateProjectId,async (req,res,next) => {
    try{
        await Projects.update(req.params.id, req.body )
        res.status(200).json(req.body)
    } catch(next) {
        
    }
    // try {
    //     if(!req.body) {
    //         res.status(400).json({
    //             message:"Please provide title and contents for the project",
    //         }) 
    //     } else {
    //         const { id } = req.params
    //         const project = await Projects.get(id)

    //         if(!project){
    //             res.status(404).json({
    //                 message: "The post with the specified ID does not exist"
    //             })
    //         } else {
    //             await Projects.update(req.params.id, req.body )
    //             res.status(200).json(project)
    //         }

    //     }

    // } catch (next) {
    //     //     res.status(500).json({
    //     //     message:"The post information could not be modified",
    //     // })
        
    // }
})

router.post('/', async (req, res) =>{
    try{ 
        const {id, name, description, completed} = req.body
        if (!name || !description ) {
        // if(!req.body) {
            res.status(400).json({
                message:"Please provide complete post",
            })
        } else {
            const makePost = await Projects.insert(req.body);
            res.status(201).json(makePost)
        }  
    } catch(next) {
        // res.status(500).json({
        //     message: "There was an error while saving the post to the database",
        // });
    }
});

router.delete('/:id', validateProjectId, async (req,res,next) => {
    try{
        const remProject = await Projects.remove(req.params.id)
        res.status(200).json({message: " The action was removed"})
      } catch(next) {
      }

    // try {
    //      const remProject = await Projects.get(req.params.id )
    //      if (!remProject) {
    //          res.status(404).json({
    //              message:"The project with the specified ID does not exist",
    //          })
    //      } else {
    //          await Projects.remove(req.params.id)
    //          res.status(200).json(remProject)
    //      }

    // } catch (next) {
    //     //     res.status(500).json({
    //     //     message:"The project could not be removed",
    //     // })
        
    // }
})

router.get('/:id/actions', validateProjectId, async (req,res,next) => {
    try {
        const actions = await Projects.getProjectActions(req.params.id)
        res.status(200).json(actions)
    } catch(next) {

    }

    // try {
    //     const project = await Projects.get(req.params.id)
    //     if(!project){
    //         res.status(404).json({
    //             message: "The project with the specified ID does not exist"
    //         })
    //     } else {
    //         const actions = await Projects.getProjectActions(req.params.id)
    //         res.status(200).json(actions)
    //     }

    // } catch (next) {
    //     //     res.status(500).json({
    //     //     message:"The comments information could not be retrieved",
    //     // })
        
    // }
})

router.use((err,req,res,next)=>{
    res.status(err.status).json({
        messageTailor: "Wrong path",
        message: err.message,
        stack: err.stack,
    })
})

module.exports = router;