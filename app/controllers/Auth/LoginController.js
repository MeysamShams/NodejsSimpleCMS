const Controller=require('../Controller.js');
const {validationResult}=require('express-validator')
const passport=require('passport');

class LoginController extends Controller{
    index(req,res){
        res.render('auth/login',{title:"ورود به وبسایت"})
    }

    //login process
    loginProcess(req,res,next){
        if(this.validationData(req)){
            passport.authenticate('local-login',{successRedirect:"/auth",failureRedirect:"/",failureFlash:true})(req,res,next)
        }
        else{this.back(req,res)}
    }

    //
    validationData(req) {
        const result = validationResult(req);
        if (! result.isEmpty()) {
            const errors = result.array();
            const messages = [];
            errors.forEach(err => messages.push(err.msg));
            req.flash('errors' , messages)

            return false;
        }

        return true;
    }
}

module.exports=new LoginController();