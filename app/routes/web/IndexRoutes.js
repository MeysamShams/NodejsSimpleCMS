const router=require('express').Router();

//Home routes
router.use("/",require('./HomeRoutes'));

//Admin routes
router.use("/admin",require('./AdminRoutes'))

module.exports=router