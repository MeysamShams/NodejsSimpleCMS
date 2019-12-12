$(function(){
    var socket=io.connect("http://localhost:8081");

    $("#chat-submit").on('submit',(e)=>{
        e.preventDefault();
        var data={}
        data.msg=$('#chat-input').val();
        data.user=$('#name').val()
        data.avatar=$('#avatar').val()
        if(data.msg&&data.user&&data.avatar){
            socket.emit("message",data)
            $('#chat-input').val("");
            appendMessage(data,'owner-message');
        }
        

    })

    socket.on("recive_msg",(data)=>{
        appendMessage(data,'message')
    })

    function appendMessage(data,chatClass){
        $(".chat-content ul").append(`
        <li class="${chatClass}">
            <div class="user-info">
            <img src=${data.avatar} class="img-circle">
            </div>
            <div class="chat-message ">
            <div class="chat-message-author">${data.user}</div>
            ${data.msg}            
            </div>
        </li>`
                )

        $(".chat-content").animate({ scrollTop: 450 }, 1000);
                
    }
})