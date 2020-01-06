const Controller=require('../Controller.js');
const User=require("../../models/User")
const {UserInputError}=require('apollo-server')

class RegisterController extends Controller{

    // api *************
    async apiRegister(parent,args){
            let {name,username,password}=args;

            let checkUser=await User.find({username});
            console.log(checkUser)
            if(checkUser.length) throw new UserInputError("username already exists!")
            let user=await User.create({
                name,
                username,
                password: await User.hashing(password)
            });
            return{
                token:await User.generateToken(user.id,user.username),
                user
            }
        
    }
}

module.exports=new RegisterController()