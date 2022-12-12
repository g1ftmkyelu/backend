const JWT=require('jsonwebtoken')

const Authorize=async function(req, res, next){
    const authHeader=req.headers['authorization']
    const token=authHeader && authHeader.split(' ')[1]
    if(token==null) return res.status(401).json({message:"token not found"})
    
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET||"", (error, user)=>{
        if(error) return res.status(403).json({message:"your token is no longer valid"})
        req.user=user
        next()
    })
    }

module.exports=Authorize
