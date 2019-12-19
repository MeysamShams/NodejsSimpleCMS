$(function(){
    $(".show-reply").click(function(event){
        var replyForm=event.target.parentNode.parentNode.childNodes[3];
        $(replyForm).toggle(500)
    });
})