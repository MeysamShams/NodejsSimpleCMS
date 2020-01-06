const Controller=require('../Controller.js');
class ChatController extends Controller{
    index(req,res,next){
        // console.log(req.user)
        res.render('admin/chat');
    }
    connection(socket){
        socket
        .on('message',(data)=>{
            console.log(data)
            socket.broadcast.emit("recive_msg",data)
        })
    }
}

module.exports= new ChatController();