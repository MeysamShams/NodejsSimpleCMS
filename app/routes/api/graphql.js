const {gql}=require('apollo-server-express');

let typeDefs=gql`
    type Query{
        user:String
    }
`;

let resolvers={
    Query:{
        user:(parent,args)=> "hello"
    }
}

module.exports={typeDefs,resolvers}