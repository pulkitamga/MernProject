const jwt=require('jsonwebtoken');
exports.requireSignin=(req,res,next)=>{
    if(req.headers.authorization){
    const token=req.headers.authorization.split(" ")[1];
    //console.log(req.headers);
    const user=jwt.verify(token,process.env.JWT_SECRET);
    req.user=user;
    }
    else
    {
        return  res.status(400).json({message:'Autho required'})
    }
    next();
    
   
   
   
}
exports.userMiddleware=(req,res,next)=>{
    if(req.user.role !=='user'){
        return res.status(400).json({message:'User Acess denied'})
    }
    next();
}

exports.adminMiddleware=(req,res,next)=>{
    if(req.user.role !=='admin'){
        return res.status(400).json({message:'Admin Acess denied as you are not admin'})
    }
    next();
}