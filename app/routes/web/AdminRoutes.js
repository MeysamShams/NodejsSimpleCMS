const router=require('express').Router();
const DashCtr=require('../../controllers/Admin/DashController')
const PostCtr=require('../../controllers/Admin/PostController')
router.use((req , res , next) => {
    res.locals.layout = "admin/layout";
    next();
})

router.get("/",DashCtr.index)

router.get("/newpost",PostCtr.showForms);
router.post("/newpost",PostCtr.store)
router.get("/allposts",PostCtr.allPosts)
module.exports=router