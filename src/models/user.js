const mongoose=require('mongoose')
const  validator=require('validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const Task=require('./tasks')

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value))
            {
                throw new Error('email is not valid')
            }
        }
    },
    age:{
        type:Number,
        default:0,
        validate(value){
            if(value<0)
            {
                throw new Error('age should be positive')
            }
        }
    },
        password:{
            type:String,
            required:true,
            minlength:7,
            validate(value){
                // if (value.length<6) {
                
                //     throw new Error('password should be greter than 6 character')
                // }
                if(value.toLowerCase().includes('password'))
                {
                    throw new Error('password should not be a password')
                }
             },
             trim:true
        },
        tokens:[{
            token:{
                type:String,
                required:true
            }
        }

        ]
    
})

userSchema.virtual('tasks',{
    ref:'Task',
    localField:'_id',
    foreignField:'owner'
})

userSchema.methods.toJSON=function(){
    const user=this
    const userObject=user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

userSchema.methods.generateAuthtoken=async function(){
    const user=this
    const token=jwt.sign({_id:user._id.toString()},'thisisme')
    
    user.tokens =user.tokens.concat({token})

    await user.save()

    return token

}

userSchema.statics.findByCred=async(email,password)=>{
    const user=await User.findOne({email})

    if(!user){
        throw new Error('unable to login')
    }

    const match=await bcrypt.compare(password,user.password)

    if(!match)
    {
        throw new Error('unable to login')
    }

    return user
}


userSchema.pre('remove',async function(next){
    const user=this
    Task.deleteMany({owner:user._id})
    next()
})

//hash password
userSchema.pre('save',async function(next){
const user=this

if(user.isModified('password'))
{
    user.password = await bcrypt.hash(user.password,8)
}
//console.log('before saving')

next()
})

const User=mongoose.model('User',userSchema)

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

module.exports=User

