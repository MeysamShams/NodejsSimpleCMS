const router=require('express').Router()
const DashCtr=require('../../controllers/Admin/DashController')
const PostCtr=require('../../controllers/Admin/PostController')
const CategoryCtr=require('../../controllers/Admin/CategoryController')
const FileCtr=require('../../controllers/Admin/FileController')
const UserCtr=require('../../controllers/Admin/UserController')
const upload=require("../../helpers/FileUpload")
const ChatCtr=require('../../controllers/Admin/ChatController');

router.use((req , res , next) => {
    res.locals.layout = "admin/layout";
    next();
})

router.get("/",DashCtr.index)

//posts managemnet
router.get("/newpost",PostCtr.index);
router.post("/newpost",PostCtr.store)
router.get("/allposts",PostCtr.allPosts)

//category  
router.get("/category",CategoryCtr.index)
//save new category
router.post("/category",upload.single("cat-image"),CategoryCtr.store)

//upload maneger
router.get("/upload",FileCtr.index)
router.post("/upload",upload.single('file'),FileCtr.store)
router.get("/allFiles",FileCtr.showAllFiles)

//chat
router.get('/chatroom',ChatCtr.index)

//user
router.get("/adduser",UserCtr.index)
router.post("/adduser",UserCtr.store)

router.get("/allusers",UserCtr.showAllUsers)

module.exports=router