const express=require('express');

const postRouter=express.Router();

const {postModel}=require("../models/post.model");



/**
 * @swagger
 * components:
 *  schemas:
 *      Post:
 *          type:Object
 *          properties:
 *                  _id:
 *                      type:string
 *                      description: auto genereated id
 *                  title:
 *                        type:string
 *                        description:title of the post
 *                  body:
 *                        type:string
 *                        description:content of the post
 *                  device:
 *                         type:string
 *                         description: type of device used by the user to post
 *                  no_if_comments:
 *                         type: number 
 *                         description: total number of comments on the post
 */


/**
 * @swagger
 * /posts:
 *  get:
 *      summary: this will give all the posts made by the user
 *      responses:
 *          200:
 *              description: all the posts
 *              content:
 *                     application/json:
 *                          schema:
 *                              type:array
 *                              item:
 *                                   $ref:"#/components/schemas/Post"
 */







postRouter.get("/", async(req,res)=>{
    const query=req.query
    try{
        const post=await postModel.find({device:query});
        res.send(post);
    }
    catch(err){
        res.send(err.message)
    }
})

/**
 * @swagger
 * /posts/top:
 *  get:
 *      summary: this will give all the posts made by the user in descending order
 *      responses:
 *          200:
 *              description: all the posts in descending order
 *              content:
 *                     application/json:
 *                          schema:
 *                              type:array
 *                              item:
 *                                   $ref:"#/components/schemas/Post"
 */

postRouter.get("/top",async(req,res)=>{
    try{
        const post=await postModel.find().sort({no_if_comments:-1});
        res.send(post)
    }
    catch(err){
        res.send(err);
    }
})


/**
 * @swagger
 * /posts/update/{id}:
 *  patch:
 *      summary: this will update the posts made by the user 
 *      tags:[Post]
 *      parameters:
 *            - in: path
 *            name: id
 *            schema:
 *               type: string
 *               required: true
 *               description :user id
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json
 *                  schema:
 *                      $red:"#/components/schemas/Post"     
 *      responses:
 *          200:
 *              description: post was successfullt updated 
 *              content:
 *                     application/json:
 *                          schema:
 *                             $ref:"#/components/schemas/Post"
 *          404:
 *              description: user not found
 *          500:
 *              description: server error
 *                                   
 */



postRouter.patch("/update/:id",async(req,res)=>{
    try{
        const postID=req.params.id;
        const payload=req.body;
await postModel.findByIdAndUpdate({_id:postID},payload);
res.send("Post Updated")
    }
    catch(err){
        res.send(err.message);
    }
})

/**
 * @swagger
 * /posts/delete/{id}:
 *  delete:
 *      summary: this will remove the posts made by the user 
 *      tags:[Post]
 *      parameters:
 *            - in: path
 *            name: id
 *            schema:
 *               type: string
 *               required: true
 *               description :user id
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json
 *                  schema:
 *                      $red:"#/components/schemas/Post"     
 *      responses:
 *          200:
 *              description: post was successfullt deleted 
 *              content:
 *                     application/json:
 *                          schema:
 *                             $ref:"#/components/schemas/Post"
 *          404:
 *              description: user not found
 *          500:
 *              description: server error
 *                                   
 */

postRouter.delete("/delete/:id",async (req,res)=>{
    try{
        const postid=req.params.id;
        await postModel.findByIdAndDelete({_id:postid});
        res.send("Post deleted");
    }
    catch(err){
        res.send("Cannot delete")
    }
})







module.exports={
    postRouter
}