const express=require('express')
const Tasks=require('../models/tasks')
const auth=require('../middleware/auth')
const router=new express.Router()

router.post('/tasks',auth,async(req,res)=>{

   // const task=new Tasks(req.body)

    const task=new Tasks({
        ...req.body,
        owner:req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error)
    }
    // task.save().then(()=>{
    //         res.status(201).send(task)
    // }).catch((error)=>{
    //     res.status(400).send(error)
    // })

})

router.get('/tasks',auth,async(req,res)=>{
   try{
   const task=await  Tasks.find({owner:req.user._id})
   // await req.user.populate('tasks').execPopulate()
    res.send(task)
   }
   catch(e){
    res.send(e)
   }
    // Tasks.find({}).then((task)=>{
    //     res.send(task)
    // }).catch((error)=>{
    //     res.send(error)
    // })
})

router.get('/tasks/:id',auth,async(req,res)=>{

    const _id=req.params.id

    try {
//        const task=await Tasks.findById(_id)
        const task=await Tasks.findOne({_id,owner:req.user._id})
if (!task) {
            return res.status(404).send()
        }
        res.send(task)
        
    } catch (error) {
        res.status(500).send(error)
    
    }
    // Tasks.findById(_id).then((task)=>{
    //     if (!task) {
    //         return res.status(404).send()
    //     }
    //     res.send(task)
    // }).catch((error)=>{
    //     res.status(500).send(error)
    // })

})

router.patch('/tasks/:id', auth,async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        //const task = await Tasks.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})

        //const task=await Tasks.findById(req.params.id)
            const task=await Tasks.findOne({_id:req.params.id,owner:req.user._id})

           
        if (!task) {
            return res.status(404).send()
        }

        updates.forEach((update)=>{
            task[update]=req.body[update]
        })
        await task.save()
        res.send(task)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id',auth,async(req,res)=>{
    try {
        //const task=await Tasks.findByIdAndDelete(req.params.id)
        const task=await Tasks.findByIdAndDelete({_id:req.params.id,owner:req.user._id})
        if(!task)
        {
            return res.status(404).send('not found')
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports=router