const Controller = require('../Controller.js')

const Post = require('../../models/Post');
const Category=require('../../models/Category')
const File=require('../../models/File');

class PostController extends Controller {

    async index(req,res){
        let allCats=await this.getAllCategories();
        let allFiles=await this.getAllFiles();
        res.render("admin/newPost",{title:"افزودن مطلب جدید",allCats,allFiles})
    }
    
    

    async store(req,res){
        try{
            const newPost=new Post({
                user:req.user.id,
                category:req.body.category,
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
        res.render("admin/allposts",{title:"همه مطالب",posts})
    }

    async getAllpots(){
        try{
            return await Post.find({}).sort({createdAt:-1}).populate('user','name').exec();
        }
        catch(err){
            throw err
        }
    }

    async getAllCategories(){
        try{
            return await Category.find({}).select('name')
        }catch(err){
            throw err
        }
    }

    async getAllFiles(){
        try{
            return await File.find({})
        }catch(err){
            throw err
        }
    }
}   

module.exports = new PostController()