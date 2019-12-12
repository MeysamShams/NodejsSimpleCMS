const Controller = require('../Controller.js')

const Post = require('../../models/Post');

const CategoryCtr=require('./CategoryController');
const FileCtr=require('./FileController');

const fs=require('fs');

class PostController extends Controller {

    async index(req,res){
        let allCats=await CategoryCtr.getAllCategories();
        let allFiles=await FileCtr.getAllFiles();
        res.render("admin/newPost",{title:"افزودن مطلب جدید",allCats,allFiles})
    }
    
    async store(req,res){
            let {category,fileId,title,editor_content,tags}=req.body;
        try{    
            const newPost=new Post({
                user:req.user.id,
                file:fileId,
                slug:this.slug(req.body.title),
                body:editor_content,
                image:req.file.path.substr(6),
                category,
                title,
                tags
            })
            await newPost.save();
            res.redirect("/admin/post/allposts")
        }catch(err){
            this.back(req,res)
            throw(err)
            
        }
    }

    /* show all posts */
   async allPosts(req,res){
       let posts=await this.getAllpots();
        res.render("admin/allposts",{title:"همه مطالب",posts})
    }

    //delete post
    async delete(req,res){
        try{
            let post=await Post.findById(req.body.id)
            fs.exists("public"+post.image,(exists)=>{
                if(exists){
                    fs.unlink("public"+post.image,(err)=>{if(err) throw err})
                }
            })
            await post.remove()
            res.redirect('/admin/post/allposts')
            
        }catch(err){
            throw err
        }
    }

    slug(title){
        return title.replace(/([^۰-۹آ-یa-z0-9]|-)+/g , "-")
    }


    // get all post from db
    async getAllpots(){
        try{
            return await Post.find({}).sort({createdAt:-1}).populate('user','name').exec();
        }
        catch(err){
            throw err
        }
    }

    //get post with id
    async getPost(req,res){
        try{
            let id=req.params.id
            res.json(await Post.findById(id).populate(['user','file','category']));
        }catch(err){
            throw err
        }
    }


    async countOfPosts() {
        try {
            return await Post.countDocuments({})
        } catch (err) {
            throw err
        }
    }

    
    
}   

module.exports = new PostController()