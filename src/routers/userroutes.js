const express=require('express')
const User=require('../models/user')
const router=new express.Router()
const auth=require('../middleware/auth')

router.post('/users',async (req,res)=>{
    // console.log(req.body)
    // res.send('testing')
    const user=new User(req.body)
    try {
        await user.save()
        const token=await user.generateAuthtoken()
        res.send({user,token})
    } catch (error) {
        res.status(400)
        res.send(error)
    }
    // user.save().then(()=>{
    //     res.status(201).send(user)
    // }).catch((error)=>{
    //     res.status(400)
    //     res.send(error)
        

    // })
})

router.get('/users/me',auth,async(req,res)=>{
   
    res.send(req.user)

    // try {
    //     const users= await User.find({})
    //     res.send(users)
    // } catch (error) {
    //     res.status(500).send()
    // }
    // User.find({}).then((users)=>{
    //     res.send(users)
    // }).catch((error)=>{
    //     res.status(500).send()
    // })
})


router.post('/users/logout',auth,async (req,res)=>{

    try {
        req.user.tokens=req.user.tokens.filter((token)=>{ 
            return token.token !== req.token
        })
        await req.user.save()
        res.send()

    } catch (error) {
        res.status(500).send()        
    }
})

router.get('/users/:id',async(req,res)=>{
       const _id=req.params.id
try{
       const user=await User.findById(_id)
       if(!user){
                return res.status(404).send()
       }
       res.send(user)
   }
   catch(e){
    res.status(500).send()
   }   //    User.findById(_id).then((user)=>{
    //     if(!user){
    //         return res.status(404).send()
    //     }
    //     res.send(user)
    //    }).catch((error)=>{
    //     res.status(500).send()
    //    })
            //console.log(req.params)
    })

    router.patch('/users/me',auth, async (req, res) => {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['name', 'email', 'password', 'age']
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' })
        }
    
        try {
          //  const user=await User.findById(req.params.id)

            updates.forEach((update)=>{
                req.user[update]=req.body[update]
            })

            await req.user.save()
           
            // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        
            // if (!user) {
            //     return res.status(404).send()
            // }
    
            res.send(req.user)
        } catch (e) {
            res.status(400).send(e)
        }
    })

router.delete('/users/me',auth,async(req,res)=>{
    const user=await User.findByIdAndDelete(req.user._id)
    try {
        // if(!user)
        // {
        //     return res.status(400).send()
        // }

        await req.user.remove()
        res.send(req.user)
    } catch (error) {
        res.status(500).send(e)
    }
})

router.post('/users/login',async(req,res)=>{
        try {
            const user=await User.findByCred(req.body.email,req.body.password)
            const token=await user.generateAuthtoken()
            res.send({user,token})
        } catch (error) {
            res.status(400).send()
        }
})

module.exports=router