const jwt=require('jsonwebtoken')
const config=require('config')
const User=require('../models/User')

module.exports=async function (req,res,next){
    const token=req.header('x-auth-token')
    if(!token){
        res.status(401).json({msg:'you shell not pass!!!'})
    }
    try{
        decoded=jwt.verify(token,config.get('jwtSecret')) 
    req.user=await User.findById(decoded.user.id).select('-password')
    console.log(`${req.user.name} has been authenicate`)
    next()
    }catch(err){
        res.status(401).json({msg:'token is not valid'})
    }

    
}