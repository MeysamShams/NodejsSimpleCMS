const Controller = require('../Controller.js')
const Category=require('../../models/Category');

class CategoryController extends Controller {
   async index(req,res){
       let allCats=await this.getAllCategories();
        res.render("admin/category",{title:"دسته بندی مطالب",allCats})
    }

    async getAllCategories(){
        try{
            return await Category.find({}).sort({createdAt:-1});
        }catch(err){
            throw err
        }
    }
   async store(req,res){
        try{
            let {name,slug}=req.body
            const newCat=new Category({
                name,
                slug,
                image:req.file.path.substr(6)
            });
           await newCat.save()
            res.redirect("/admin/category")
        }catch(err){
            this.back(req,res)
            throw err;
        }
    }


   

}
module.exports = new CategoryController()