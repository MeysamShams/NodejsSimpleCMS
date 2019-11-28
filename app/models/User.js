const mongoose=require('mongoose');
const Schema=require('mongoose').Schema

const UserSchema=new Schema({
    name:{type:String,required:true},
    username:{type:String,required:true},
    password:{type:String,trim:true,required:true},
    role:{type:String,default:'user'},
    profileImage:{type:String,default:"/"}
},{timestamps:true});

module.exports=mongoose.model('user',UserSchema);