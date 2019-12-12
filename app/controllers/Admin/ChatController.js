const Controller=require('../Controller.js');
class ChatController extends Controller{
    index(req,res,next){
        res.render('admin/chat');
    }
    connection(socket){
        socket.on('message',(data)=>{
            socket.broadcast.emit("recive_msg",data)
        })
    }
}

module.exports= new ChatController();