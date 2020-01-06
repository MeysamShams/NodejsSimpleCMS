const mongoose=require('mongoose');
const Schema=require('mongoose').Schema
const bcrypt=require('bcryptjs');
const passwordHashing=require('../helpers/PasswordHashing');
const jwt=require('jsonwebtoken');

const {AuthenticationError}=require('apollo-server')

const UserSchema=new Schema({
    name:{type:String,required:true},
    username:{type:String,required:true},
    password:{type:String,trim:true,required:true},
    role:{type:String,default:'user'},
    profileImage:{type:String,default:"http://s6.picofile.com/file/8382166268/New_Project.png"}
},{timestamps:true});

UserSchema.statics.hashing=async function(password){
    try{
        return await passwordHashing(password)
    }catch(err){
        throw err
    }
}
UserSchema.methods.comparePassword= async function(password){
    try{
        return await bcrypt.compare(password,this.password)
    }catch(err){
        throw err
    }
}


UserSchema.statics.generateToken=async function(id,username,profileImage){
    return await jwt.sign({id,username,profileImage},"],vdk,;],gi",{expiresIn:"50days"})
}
UserSchema.statics.checkToken=async function(req,secret){
    const token=req.headers['x-auth'];
    if(token){
        try{
            return await jwt.verify(token,"],vdk,;],gi");
        }catch {
            return undefined
        }
    }else return undefined
}
module.exports=mongoose.model('User',UserSchema);
