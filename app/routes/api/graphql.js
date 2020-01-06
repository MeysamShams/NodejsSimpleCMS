const {gql}=require('apollo-server-express');
const Category=require('../../models/Category');
const Post=require('../../models/Post');
const User=require('../../models/User');
const File=require('../../models/File');
const Comment=require('../../models/Comment.js');

const LoginCtrl=require("../../controllers/Auth/LoginController");
const RegisterCtrl=require("../../controllers/Auth/RegisterController");
const CommentCtrl=require("../../controllers/Admin/CommentController");


let typeDefs=gql`
    type Query{
        sliders:[Slider],
        categories:[Category],
        posts(categoryId:String):[Post],
        post(id:String!):Post,
        user(id:String!):User,
        comments(postId:String!):[Comment]
        checkToken:Boolean
    }

    type Mutation{
        register(name:String!,username:String!,password:String!):Token!,
        login(username:String!,password:String!):Token!,
        addComment(postId:String!,body:String!,parentId:String) : Comment
    }
    type Token{
        token:String,
        user:User
    }

    type Slider{
        image:String,
        link:String
    }
    type Category{
        id:String,
        image:String,
        name:String
        postsCount:PostsCount
    }
    type PostsCount{
        count:String
    }
    type Post{
        id:String,
        author:User,
        file:File,
        category:Category
        commentsCount:CommentsCount,
        title:String,
        body:String,
        image:String,
        tags:String,
        createdAt:String
    }
    type CommentsCount{
        count:String,
    }
    type User{
        id:String,
        name:String,
        username:String,
        profileImage:String,
        posts:[Post]
    }
    type Comment{
        id:String,
        author:User,
        children:[Comment],
        body:String,
        createdAt:String
    }
    type File{
        name:String,
        path:String,
        size:String
    }
`;

let resolvers={
    Query:{
        categories:async(parent,args)=> await Category.find({}),
        posts:async(parent,args)=>{
            if(args.categoryId!="null"){return await Post.find({category:args.categoryId}).sort({createdAt:-1})}
            else return await Post.find({}).sort({createdAt:-1})
        },
        post:async(parent,args)=>await Post.findById(args.id),
        user:async(parent,args)=>await User.findById(args.id),
        comments:async(parent,args)=>await Comment.find({post:args.postId,parentId:null,approved:true}).sort({createdAt:-1}),
        checkToken: LoginCtrl.apiCheckToken,

    },
    Mutation:{
        register:RegisterCtrl.apiRegister,

        login:LoginCtrl.apiLogin,

        addComment: CommentCtrl.apiAddComment
    },
    Post:{
        author:async(parent,args)=> await User.findById(parent.user),
        file:async(parent,args)=> await File.findById(parent.file),
        category:async(parent,args)=> await Category.findById(parent.category),
        commentsCount:async(parent,args)=> {
            let count=await Comment.countDocuments({post:parent.id,approved:true});
            return {
                count,
            };
        }
    },
    Category:{
        postsCount:async(parent,args)=> {
            let count=await Post.countDocuments({category:parent.id,});
            return {
                count,
            };
        }
    },
    User:{
        posts:async(parent,args)=> await Post.find({user:parent.id})
    },
    Comment:{
        author:async(parent,args)=>await User.findById(parent.user),
        children:async(parent,args)=>await Comment.find({parentId:parent.id})
    }
}

let context=async({req})=>{
    let user= await User.checkToken(req);
    return{
        user
    } 
}

module.exports={typeDefs,resolvers,context}