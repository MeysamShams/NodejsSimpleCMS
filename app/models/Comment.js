const mongoose=require('mongoose');
const Schema=require('mongoose').Schema

const CommentSchema=new Schema({
    user:{type:Schema.Types.ObjectId,ref:'User'},
    post:{type:Schema.Types.ObjectId,ref:'Post'},
    approved:{type:Boolean,default:false},
    parentId:{type:Schema.Types.ObjectId,ref:'Comment',default:null},
    body:{type:String,required:true},
    likes:{Types:Number,default:0}
    
},{timestamps:true});

module.exports=mongoose.model('Comment',CommentSchema);