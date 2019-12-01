const mongoose=require('mongoose');
const Schema=require('mongoose').Schema
const UserSchema=new Schema({
    name:{type:String,required:true},
    username:{type:String,required:true},
    password:{type:String,trim:true,required:true},
    role:{type:String,default:'user'},
    profileImage:{type:String,default:"/uploads/default/user-profile.jpg"}
},{timestamps:true});


UserSchema.methods.comparePassword=function(password){
    return this.password==password ;
}

module.exports=mongoose.model('User',UserSchema);
