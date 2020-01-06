const multer=require('multer');
const mkdirp=require('mkdirp');
const fs=require('fs');

let getDirImage=()=>{
    let year=new Date().getFullYear();
    let month=new Date().getMonth()+1;
    let day=new Date().getDay()+1;
    return `./public/uploads/${year}/${month}/${day}`;
}
const ImageStorage=multer.diskStorage({
    destination:(req,file,cb)=>{

        let dir=getDirImage();
        mkdirp(dir,(err)=>{
            if(err) throw err
            cb(null,dir)

        })
    },
    filename:(req,file,cb)=>{
        let filePath=getDirImage()+'/'+file.originalname;
        if(!fs.existsSync(filePath)) cb(null,file.originalname)
        else cb(null,Date.now()+'-'+file.originalname)
    }
    
})
const uploadImage=multer({
    storage:ImageStorage,
    limits:1024*1024*50
})
module.exports=uploadImage