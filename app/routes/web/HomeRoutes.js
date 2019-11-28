const router=require('express').Router();
const validation=require('../../middlewares/Validation')
const LoginCrt=require('../../controllers/Auth/LoginController')
const passport = require('passport');

//show index page
router.get("/",LoginCrt.index);

//local login
router.post("/auth/login",validation.loginValidation(),LoginCrt.loginProcess)
router.get("/auth/logout",(req,res)=>req.logOut())

//google login
router.get("/auth/google",passport.authenticate('google' , { scope : ['profile' , 'email'] }))
router.get("/auth/google/callback",passport.authenticate('google' , { successRedirect : '/panel' , failureRedirect : '/register' }))

//github login
router.get("/auth/github",passport.authenticate('github' , { scope : ['profile' , 'email'] }))
router.get("/auth/github/callback",passport.authenticate('github' , { successRedirect : '/panel' , failureRedirect : '/register' }))

router.get("/panel",(req,res)=>{
    if(req.isAuthenticated && req.user.role=="admin") return res.redirect('/admin');
    if(req.isAuthenticated && req.user.role=="teacher") return res.redirect("/teacher")
    if(req.isAuthenticated && req.user.role=="user") return res.redirect("/")
})
router.get("/user",(req,res)=>res.send(req.user))

module.exports=router