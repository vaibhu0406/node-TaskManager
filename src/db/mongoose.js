const mongoose=require('mongoose')
const  validator=require('validator')
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true 
})

// const User=mongoose.model('User',{
//     name:{
//         type:String,
//         required:true,
//         trim:true
//     },
//     email:{
//         type:String,
//         required:true,
//         trim:true,
//         lowercase:true,
//         validate(value){
//             if(!validator.isEmail(value))
//             {
//                 throw new Error('email is not valid')
//             }
//         }
//     },
//     age:{
//         type:Number,
//         default:0,
//         validate(value){
//             if(value<0)
//             {
//                 throw new Error('age should be positive')
//             }
//         }
//     },
//         password:{
//             type:String,
//             required:true,
//             minlength:7,
//             validate(value){
//                 // if (value.length<6) {
                
//                 //     throw new Error('password should be greter than 6 character')
//                 // }
//                 if(value.toLowerCase().includes('password'))
//                 {
//                     throw new Error('password should not be a password')
//                 }
//              },
//              trim:true
//         }
    
// })

// const me=new User({
//     name:'ram',
//     email:'Vnpandy@gamail.com',
//     age:30,
//     password:'password'
// })

// me.save().then(()=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log(error)
// })


// const Tasks =mongoose.model('Tasks',{
//     description:{
//         type:String,
//         required:true,
//         trim:true
//     },
//     completed:{
//         type:Boolean,
//         default:false
//     }
// })

// const task1=new Tasks({
    
    
// })

// task1.save().then(()=>{
//     console.log(task1)
// }).catch((error)=>{
//     console.log(error)
// })