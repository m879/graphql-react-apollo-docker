const express=require('express');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
var cors = require("cors");

const {ApolloServer} =require('apollo-server-express');
const typeDefs=require('./graphql/typeDefs');
const resolvers=require('./graphql/resolvers');

async function startserver(){
    const app=express();
    const apolloServer=new ApolloServer({ typeDefs, resolvers });
    await apolloServer.start();
    apolloServer.applyMiddleware({app:app,path:'/server'});
    app.use((req,res)=>{
        res.send("Express with Apollo");
    });

    dotenv.config();

    // Connect to database
    mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true,useUnifiedTopology: true,})
      .then(() => console.log("Database connected!"))
      .catch((err) => console.log(err));

    app.use(cors());
    app.listen(4000,()=>console.log("Server is running"));
}
startserver();