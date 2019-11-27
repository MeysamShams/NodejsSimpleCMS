const router=require('express').Router();

const LoginCrt=require('../../controllers/Auth/LoginController')
//show index page
router.get("/",LoginCrt.index);


module.exports=router