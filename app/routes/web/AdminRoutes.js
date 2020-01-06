const router=require('express').Router()
const DashCtr=require('../../controllers/Admin/DashController')
const PostCtr=require('../../controllers/Admin/PostController')
const CategoryCtr=require('../../controllers/Admin/CategoryController')
const FileCtr=require('../../controllers/Admin/FileController')
const UserCtr=require('../../controllers/Admin/UserController')
const CommentCtr=require("../../controllers/Admin/CommentController")
const upload=require("../../helpers/FileUpload")
const ChatCtr=require('../../controllers/Admin/ChatController');

router.use((req , res , next) => {
    res.locals.layout = "admin/layout";
    next();
})

router.get("/",DashCtr.index)

//posts 
router.get("/post",PostCtr.index);
router.post("/post",upload.single("image"),PostCtr.store)
router.get("/post/allposts",PostCtr.allPosts)
router.post('/post/delete',PostCtr.delete)

//category  
router.get("/category",CategoryCtr.index)
//save new category
router.post("/category",upload.single("cat-image"),CategoryCtr.store)

//upload 
router.get("/upload",FileCtr.index)
router.post("/upload",upload.single('file'),FileCtr.store)
router.get("/allFiles",FileCtr.showAllFiles)

//chat and Comment
router.get('/chatroom',ChatCtr.index)

router.get("/comments",CommentCtr.index)
router.post("/comments/addReply",CommentCtr.addReply)
router.post("/comments/approve",CommentCtr.approveComment)

//user
router.get("/adduser",UserCtr.index)
router.post("/adduser",UserCtr.store)

router.get("/allusers",UserCtr.showAllUsers)

module.exports=router