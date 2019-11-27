const Controller=require('../Controller.js')
class LoginController extends Controller{
    index(req,res){
        res.render('auth/login',{title:"ورود به وبسایت"})
    }
}

module.exports=new LoginController();