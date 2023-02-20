const jwt=require('jsonwebtoken');

const authenticate=(req,res,next)=>{
    const token=req.headers.authorization;
    if(token){
        jwt.verify(token,"evaluation",(err,decoded)=>{
            if(err){
                res.send("Login first")
            }else{
                req.body.user=decoded.userID;
                next();
            }
        })
    }
    else{
        res.send("Login First")
    }
}

module.exports={
    authenticate
}