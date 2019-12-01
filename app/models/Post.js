const mongoose=require('mongoose');
const Schema=require('mongoose').Schema
const paginate=require('mongoose-paginate');

const PostSchema=new Schema({
    user:{type:Schema.Types.ObjectId,ref:'User'},
    category:{type:Schema.Types.ObjectId,ref:'Category'},
    file:{type:Schema.Types.ObjectId,ref:'File'},
    title:{type:String,required:true},
    slug:{type:String,required:true},
    body:{type:String},
    commentsCount:{type:Number,default:0},
    tags:{type:String},
    image:{type:String,default:'/'},
    
},{timestamps:true});
PostSchema.virtual('post',{
    
})
mongoose.plugin(paginate)

module.exports=mongoose.model('Post',PostSchema);