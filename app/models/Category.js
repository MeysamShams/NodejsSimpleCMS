const mongoose=require('mongoose');
const Schema=require('mongoose').Schema

const CategorySchema=new Schema({
    name:{type:String,required:true},
    slug:{type:String,required:true},
    image:{type:String,default:"/"}
},{timestamps:true});

module.exports=mongoose.model('Category',CategorySchema);