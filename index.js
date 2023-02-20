const express=require('express');

const {connection}=require('./config/db');
const {userRouter}=require('./routes/user.route')
const {postRouter}=require("./routes/post.route");
const cors=require('cors');
require('dotenv').config();
const swaggerUI=require('swagger-ui-express');
const swaggerJsDoc=require('swagger-jsdoc');
const authenticate=require('./middleware/authenticate');

const app=express();

app.use(express.json());
app.use(cors());


const options={
    definition:{
        operapi:"3.0.0",
        info:{
            title:"Evaluation",
            version:"1.0.0"
        },
        servers:[
            {
                url:"http://localhost:4400"
            }
        ]
    },
    apis:["./routes/*.js"]
}
const swaggerSpec=swaggerJsDoc(options);
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerSpec));




app.use("/users",userRouter)
app.use("authenticate");
app.use("/posts",postRouter);

app.listen(4400,async ()=>{
    try{
        await connection;
        console.log("Connected and Listening to 4400");
    }
    catch(err){
        console.log(err);
    }
})

