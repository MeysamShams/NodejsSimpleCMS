const router=require('express').Router();
const validation=require('../../middlewares/Validation')
const LoginCrt=require('../../controllers/Auth/LoginController')

//show index page
router.get("/",LoginCrt.index);

//local login
router.post("/auth/login",validation.loginValidation(),LoginCrt.loginProcess)

module.exports=router