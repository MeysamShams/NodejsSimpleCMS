const Controller=require('../Controller.js');
const User=require('../../models/User');

class UserController extends Controller{
    index(req,res){
        res.render("admin/newUser",{title:"افزودن کاربر جدید"})
    }

    async store(req,res){
        try{
            let {name,username,password,role}=req.body;

            const newUser=new User({
                name,
                username,
                password:await User.hashing(password),
                role
            })
            await newUser.save();
            res.redirect("/admin/allusers")
        }catch(err){
            this.back(req,res)
            throw err
        }
    }

   async showAllUsers(req,res){
       let users= await this.getAllUsers();
        res.render("admin/allusers",{title:"مشاهده کاربران",users})
    }
    async getAllUsers(){
        try{
            return await  User.find({});
        }catch(err){
            throw err
        }
    }


    async countOfUsers(role) {
        try {
            return await User.countDocuments({
                role
            })
        } catch (err) {
            throw err
        }
    }
}
module.exports=new UserController();