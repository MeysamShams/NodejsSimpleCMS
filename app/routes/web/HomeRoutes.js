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
router.get("/auth/google/callback",passport.authenticate('google' , { successRedirect : '/user' , failureRedirect : '/register' }))

//github login
router.get("/auth/github",passport.authenticate('github' , { scope : ['profile' , 'email'] }))
router.get("/auth/github/callback",passport.authenticate('github' , { successRedirect : '/user' , failureRedirect : '/register' }))


router.get("/user",(req,res)=>res.send(req.user))

module.exports=router