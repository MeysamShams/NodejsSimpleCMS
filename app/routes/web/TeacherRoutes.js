const router=require('express').Router();

router.get("/",(req,res)=>{
    res.send("This is Teacher page")
})

module.exports=router