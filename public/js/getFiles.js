$(function(){
   $(".select-file").click(function(e){
      let fileId=e.delegateTarget.dataset.fileid;
      let fileName=e.delegateTarget.dataset.filename;
      console.log(fileId)
      $("#file-id").val(fileId)
      $('.modal').modal('toggle');
     $('#file-name').val(fileName)
  })
})