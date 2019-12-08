const {gql}=require('apollo-server-express');

let typeDefs=gql`
    type Query{
        sliders:[Slider],
        categories:[Category],
        posts:[Post],
        post(id:String):Post,
        user(id:String):User,
        comments(postId:String):[Comment]
    }

    type Slider{
        image:String,
        href:String
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
        avatar:String,
    }
    type Comment{
        id:String,
        author:User,
        parent:Comment,
        body:String,
        date:String
    }
    type File{
        name:String,
        link:String,
        size:String
    }
`;

let resolvers={
    Query:{
        user:(parent,args)=> "hello"
    }
}

module.exports={typeDefs,resolvers}