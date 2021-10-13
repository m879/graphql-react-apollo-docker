const express=require('express');
const {ApolloServer,gql} =require('apollo-server-express');

const typeDefs=require('./graphql/typeDefs');
const {resolvers} =require('./graphql/resolvers/books');

// const typeDefs = gql`
//   # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

//   # This "Book" type defines the queryable fields for every book in our data source.
//   type Book {
//     title: String
//     author: String
//   }

//   # The "Query" type is special: it lists all of the available queries that
//   # clients can execute, along with the return type for each. In this
//   # case, the "books" query returns an array of zero or more Books (defined above).
//   type Query {
//     books: [Book]
//   }
// `;



// const books = [
//     {
//       title: 'The Awakening',
//       author: 'Kate Chopin',
//     },
//     {
//       title: 'City of Glass',
//       author: 'Paul Auster',
//     },
//   ];

  // Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
// const resolvers = {
//     Query: {
//       books: () => books,
//     },
//   };
  
async function startserver(){
    const app=express();
    const apolloServer=new ApolloServer({ typeDefs, resolvers });
    await apolloServer.start();
    apolloServer.applyMiddleware({app:app,path:'/server'});
    app.use((req,res)=>{
        res.send("Epxress with Apollo");
    })
    app.listen(4000,()=>console.log("Server is running"));
}
startserver();