const router=require('express').Router();

router.use((req , res , next) => {
    res.locals.layout = "admin/layout";
    next();
})

router.get("/",(req,res)=>{
    res.render("admin/home",{title:"پیشخوان "})
})

module.exports=router