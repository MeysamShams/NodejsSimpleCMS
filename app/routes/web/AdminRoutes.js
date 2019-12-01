const router=require('express').Router();
const DashCtr=require('../../controllers/Admin/DashController');
const PostCtr=require('../../controllers/Admin/PostController');
const CategoryCtr=require('../../controllers/Admin/CategoryController');
const FileCtr=require('../../controllers/Admin/FileController')
const upload=require("../../helpers/FileUpload");
router.use((req , res , next) => {
    res.locals.layout = "admin/layout";
    next();
})

router.get("/",DashCtr.index)

//posts managemnet
router.get("/newpost",PostCtr.index);
router.post("/newpost",PostCtr.store)
router.get("/allposts",PostCtr.allPosts)

//upload maneger
router.get("/upload",FileCtr.index)
//upload
router.post("/upload",upload.single('file'),FileCtr.store)
router.get("/allFiles",FileCtr.showAllFiles)

router.get("/categories",CategoryCtr.index)
//save new category
router.post("/category",upload.single("cat-image"),CategoryCtr.store)
module.exports=router