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
            passport.authenticate('local-login',{successRedirect:"/panel",failureRedirect:"/",failureFlash:true})(req,res,next)
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

    logOut(req,res){
        req.logOut();
        res.redirect("/")
    }

    checkRole(req,res){
        if(req.user.role=="admin") return res.redirect("/admin")
        if(req.user.role=="teacher") return res.redirect("/teacher")
        if(req.user.role=="user") return res.redirect("/user")
    }
}

module.exports=new LoginController();