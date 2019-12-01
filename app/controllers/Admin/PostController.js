const Controller = require('../Controller.js')

const Post = require('../../models/Post');
const User=require('../../models/User')

class PostController extends Controller {

    showForms(req,res){
        res.render("admin/newPost")
    }
    
    async store(req,res){

        try{
            const newPost=new Post({
                user:req.user.id,
                category:req.user.id,
                file:req.user.id,
                title:req.body.title,
                slug:this.slug(req.body.title),
                body:req.body.editor_content,
                tags:req.body.tags
            })
            await newPost.save();
            res.redirect("/admin/allposts")
        }catch(err){
            this.back(req,res)
            throw(err)
            
        }
    }
    slug(title){
        return title.replace(/([^۰-۹آ-یa-z0-9]|-)+/g , "-")
    }

   async allPosts(req,res){
       let posts=await this.getAllpots();
        res.render("admin/allposts",{posts})
    }
    async getAllpots(){
        try{
            return await Post.find({}).sort({createdAt:-1}).populate('user','name').exec();
        }
        catch(err){
            throw err
        }
    }
}   

module.exports = new PostController()