const router=require('express').Router();
const validation=require('../../middlewares/Validation')
const LoginCrt=require('../../controllers/Auth/LoginController')
const passport = require('passport');

//show index page
router.get("/",LoginCrt.index);

//local login
router.get("/panel",LoginCrt.checkRole)
router.post("/auth/login",validation.loginValidation(),LoginCrt.loginProcess)
router.get("/auth/logout",LoginCrt.logOut)

//google login
router.get("/auth/google",passport.authenticate('google' , { scope : ['profile' , 'email'] }))
router.get("/auth/google/callback",passport.authenticate('google' , { successRedirect : '/panel' , failureRedirect : '/register' }))

//github login
router.get("/auth/github",passport.authenticate('github' , { scope : ['profile' , 'email'] }))
router.get("/auth/github/callback",passport.authenticate('github' , { successRedirect : '/panel' , failureRedirect : '/register' }))



router.get("/user",(req,res)=>res.send(req.user))

module.exports=router