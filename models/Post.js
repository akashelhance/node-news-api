const mongoose = require('mongoose')
// const {ObjectId} = mongoose.Schema.Types
const postSchema = new mongoose.Schema({
    author:{
        type:String,
        
    },
    title:{
        type:String,
        required:true
    },
   
    description:{
        type:String,
        required:false
    },
    url:{
        type:String,
        required:false
    },
    keyword:{
        type:String,
        required:false
        
     }
   
})

module.exports = mongoose.model("Post", postSchema);