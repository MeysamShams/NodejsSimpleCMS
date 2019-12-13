const Controller=require('../Controller.js');
const Comment=require('../../models/Comment');
const {ForbiddenError}=require('apollo-server')

class CommentController extends Controller{
    index(req,res){
        res.send("admin")
    }

//api ********************************
    async apiAddComment(parent,args,context){
        if(! context.user) throw new ForbiddenError('invalid token')
        let {postId,parentId,body}=args

        return await Comment.create({
            user:context.user.id,
            post:postId,
            parentId:parentId || null,
            body,

        })
    }
}

module.exports=new CommentController()