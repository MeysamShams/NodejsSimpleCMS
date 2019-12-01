const Controller= require("../Controller.js");
const File=require('../../models/File');
class FileController extends Controller{
    index(req,res){
        res.render("admin/newFile")
    }
   async store(req,res){
       let {path,size}=req.file;
        try{
            const newFile=new File({
                user:req.user.id,
                name:req.body.name,
                path:path.substr(6),
                size,
            })
            newFile.save();
            res.redirect("/admin/allFiles")
        }catch(err){
            this.back(req,res)
            throw err
        }
    }

    async showAllFiles(req,res){
        let files=await this.getAllFiles();
        res.render("admin/allFiles",{
            title:"فایل های آپلود شده",
            files
        })
    }
    async getAllFiles(){
        try{
            return await File.find({});
        }catch(err){
            throw err
        }
    }
}
module.exports=new FileController();