const Controller=require('../Controller.js');
const Comment=require('../../models/Comment');
const {ForbiddenError}=require('apollo-server')

class CommentController extends Controller{
    async index(req,res){
        try{
            let comments=await Comment.find({approved:false}).populate(['user','post','parentId']);
            res.render('admin/allComments',{title:"نظرات کاربران",comments})
        }catch(err){
            this.back(req,res)
            throw(err)
        }
    }

   async approveComment(req,res,next){
        try{
            await Comment.findByIdAndUpdate(req.body.commentId,{approved:true})
            this.back(req,res);
        }catch(err){
            res.send(err);
        }
    }

   async addReply(req,res,next){
       let {postId,parentId,reply}=req.body
        try{
            const newComment=await Comment.create({
                user:req.user.id,
                post:postId,
                parentId:parentId,
                body:reply,
                approved:true
            })
            await Comment.findByIdAndUpdate(parentId,{approved:true});
            console.log("ok");
            this.back(req,res)
        }catch(err){
            this.back(req,res)
            throw err
        }

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