const mongoose=require('mongoose');
const Schema=require('mongoose').Schema
const UserSchema=new Schema({
    name:{type:String,required:true},
    username:{type:String,required:true},
    password:{type:String,trim:true,required:true},
    role:{type:String,default:'user'},
    profileImage:{type:String,default:"/"}
},{timestamps:true});

UserSchema.method.comparePassword=function(password){
    if(this.password==password) return true
    return false
}
module.exports=mongoose.model('user',UserSchema);