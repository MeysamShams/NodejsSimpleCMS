const mongoose=require('mongoose');
const Schema=require('mongoose').Schema

const FileSchema=new Schema({
    user:{type:Schema.Types.ObjectId,ref:"User"},
    name:{type:String,required:true},
    path:{type:String,required:true},
    size:{type:String}   
    
},{timestamps:true});

module.exports=mongoose.model('file',FileSchema);