const mongoose=require("mongoose");

const postSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        max:255,
        min:3
    },
    description: {
        type: Object,
        required: true
    },
    time:{
        type:Date,
        default:Date.now
    },
})

module.exports=mongoose.model('Post',postSchema);