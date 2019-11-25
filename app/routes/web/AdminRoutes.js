const router=require('express').Router();

router.get("/",(req,res)=>{
    res.send("This is admin page")
})

module.exports=router