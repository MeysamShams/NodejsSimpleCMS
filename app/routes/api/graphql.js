const {gql}=require('apollo-server-express');
const Category=require('../../models/Category');
const Post=require('../../models/Post');
const User=require('../../models/User');
const File=require('../../models/File');
const Comment=require('../../models/Comment.js');
const {UserInputError,AuthenticationError,ForbiddenError}=require('apollo-server')

let typeDefs=gql`
    type Query{
        sliders:[Slider],
        categories:[Category],
        posts:[Post],
        post(id:String!):Post,
        user(id:String!):User,
        comments(postId:String!):[Comment]
    }

    type Mutation{
        register(name:String!,username:String!,password:String!):Token!,
        login(username:String!,password:String!):Token!,
        addComment(postId:String!,body:String!,parentId:String) : String
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
        createdAt:String
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
    Mutation:{
        register:async(parent,args)=>{
            let {name,username,password}=args;
            let checkUser=await User.find({username});
            if(checkUser) throw new UserInputError("username already exists!")
            let user=await User.create({
                name,
                username,
                password: await User.hashing(password)
            });
            return{
                token:await User.generateToken(user.id,user.username),
                user
            }
        },

        login:async(parent,args)=>{
                let {username,password}=args;
                let user=await User.findOne({username});
                if(!user) throw new UserInputError('invalid username')
                if(!await user.comparePassword(password)){
                    throw new AuthenticationError('invalid password')
                }
                return {
                    token:await User.generateToken(user.id,user.username),
                    user
                }
        },

        addComment:async(parent,args,context)=>{
                if(! context.user) throw new ForbiddenError('invalid token')
                let {postId,parentId,body}=args

                return await CommentModel.create({
                    user:context.user.id,
                    post:postId,
                    parentId:parentId || null,
                    body,

                })
        }
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

let context=async(req)=>{
    let user= await User.checkToken(req);
    return{
        user
    } 
}

module.exports={typeDefs,resolvers,context}