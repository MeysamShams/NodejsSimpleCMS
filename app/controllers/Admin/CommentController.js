const Controller=require('../Controller.js');

class CommentController extends Controller{
    index(req,res){
        res.send("admin")
    }
}

module.exports=new CommentController()