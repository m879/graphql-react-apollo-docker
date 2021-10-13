const Post =require('../models/post');

const resolvers = {
    Query: {
      hello:()=>{
         return "Hello World"
      },
      getAllPost:async ()=>{
          return await Post.find();
      },
      getPost:async (_parent,{id},_context,_info)=>{
            return await Post.findById(id);
      }
    },
    Mutation:{
      createPost:async (parent,args,context,info)=>{
         const {title,description}=args.post;
         const post=new Post({title,description});
         await post.save();
         return post;
      },
      deletePost:async (parent,args,context,info)=>{
        const {id}=args;
        await Post.findByIdAndDelete(id);
        return "Post Deleted successfully!!!"
      },
      updatePost:async (parent,{id,post},context,info)=>{
        const {title,description}=post;
        const updates={};
        if(title!==undefined){
            updates.title=title
        }
        if(description!==undefined){
          updates.description=description
        }
        return await Post.findByIdAndUpdate(id,updates,{new:true});
      }

    }
};
module.exports=resolvers;
