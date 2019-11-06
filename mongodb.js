// const mongodb=require('mongodb')
// const mongoClient=mongodb.MongoClient
// const objectID=mongodb.ObjectID

const {MongoClient,ObjectID}=require('mongodb')

const connectionUrl='mongodb://127.0.0.1:27017'
const databasename='task-manager'

MongoClient.connect(connectionUrl,{useNewUrlParser:true,useUnifiedTopology: true},(error,client)=>{
    if (error) {
        return console.log('unable to connect')
    }

   const db= client.db(databasename)

//    db.collection('users').insertOne({
//        name:'vaibhavi',
//        age:'22'
//    },(error,result)=>{
//         if (error) {
//             return console.log('unable to insert')
//         }

//         console.log(result.ops)
//    })
//     console.log('connected')
// })
// db.collection('users').insertMany([{
//     name:'vaibhavi',
//     age:'22'
// },{
//     name:'deepika',
//     age:32
// },{
//     name:'virat',
//     age:38
// }],(error,result)=>{
//      if (error) {
//          return console.log('unable to insert')
//      }

//      console.log(result.ops)
// })
//  console.log('connected')
// })


// db.collection('tasks').insertMany([
//     {
//         description: 'Clean the house',
//         completed: true
//     },{
//         description: 'Renew inspection',
//         completed: false
//     },{
//         description: 'Pot plants',
//         completed: false
//     }
// ], (error, result) => {
//     if (error) {
//         return console.log('Unable to insert tasks!')
//     }

//     console.log(result.ops)
// })

// db.collection('tasks').findOne({_id: new ObjectID("5dbd82a3e798f928b031acef")},(error,task)=>{
//     if (error) {
//         return console.log('unable to fetch')
//     }

//     console.log(task)
// })


// db.collection('tasks').findOne({ _id: new ObjectID("5dbd82a3e798f928b031acef") }, (error, task) => {
//     console.log(task)
// })

// db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
//     console.log(tasks)
// })

// db.collection('tasks').updateMany({completed:false},{

//     $set:{
//         completed:true
//     }

// }).then((result)=>{
//     console.log(result)
// }).catch((error)=>{
//     console.log('error')
// })

db.collection('tasks').deleteOne({
    description: 'Clean the house'
}).then((result)=>{
         console.log(result)
     }).catch((error)=>{
         console.log('error')

})


})