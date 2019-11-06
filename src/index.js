const express=require('express')
require('./db/mongoose.js')
const User=require('./models/user.js')
const Tasks=require('./models/tasks.js')
const userrouter=require('./routers/userroutes')
const tasksrouter=require('./routers/tasksroutes')

const app=express()

const port=3000

app.use(express.json())

app.use(userrouter)
app.use(tasksrouter)




app.listen(port,()=>{
    console.log('server is up')
})