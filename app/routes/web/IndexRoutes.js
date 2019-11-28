const router=require('express').Router();
const Auth=require('../../middlewares/Authentication')
//Home routes
router.use("/",require('./HomeRoutes'));

//Admin routes
router.use("/admin",Auth.redirectIfNotAdmin,require('./AdminRoutes'))

//Teacher routes
router.use("/teacher",Auth.redirectIfNotTeacher,require('./TeacherRoutes'));

module.exports=router