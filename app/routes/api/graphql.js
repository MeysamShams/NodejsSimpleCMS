const {gql}=require('apollo-server-express');
const Category=require('../../models/Category');
const Post=require('../../models/Post');
const User=require('../../models/User');
const File=require('../../models/File');
const Comment=require('../../models/Comment.js');

let typeDefs=gql`
    type Query{
        sliders:[Slider],
        categories:[Category],
        posts:[Post],
        post(id:String!):Post,
        user(id:String!):User,
        comments(postId:String!):[Comment]
    }

    type Slider{
        image:String,
        link:String
    }
    type Category{
        id:String,
        image:String,
        name:String
    }
    type Post{
        id:String,
        author:User,
        file:File,
        category:Category
        title:String,
        body:String,
        image:String,
        tags:String,
        commentsCount:String,
        date:String
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
        date:String
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
        posts:async(parent,args)=>await Post.find({}),
        post:async(parent,args)=>await Post.findById(args.id),
        user:async(parent,args)=>await User.findById(args.id),
        comments:async(parent,args)=>await Comment.find({post:args.postId})
    },
    Post:{
        author:async(parent,args)=> await User.findById(parent.user),
        file:async(parent,args)=> await File.findById(parent.file),
        category:async(parent,args)=> await Category.findById(parent.category)
    },
    User:{
        posts:async(parent,args)=> await Post.find({user:parent.id})
    },
    Comment:{
        author:async(parent,args)=>await User.findById(parent.user),
        children:async(parent,args)=>await Comment.find({parent:parent.id})
    }
}

module.exports={typeDefs,resolvers}