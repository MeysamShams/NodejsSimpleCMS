const router=require('express').Router();
const DashCtr=require('../../controllers/Admin/DashController')
router.use((req , res , next) => {
    res.locals.layout = "admin/layout";
    next();
})

router.get("/",DashCtr.index)

module.exports=router