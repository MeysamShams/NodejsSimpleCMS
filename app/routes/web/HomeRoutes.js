const router=require('express').Router();

//show index page
router.get("/",(req,res)=>res.send("home page"));


module.exports=router