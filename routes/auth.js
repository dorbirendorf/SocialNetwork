const express=require('express')
const router=express.Router()
const auth=require('../middleware/auth')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const User=require('../models/User')
const config=require('config')
const { check ,validationResult } =require('express-validator')



// @route      GET /auth
// @decription get my user 
// @accsess    private
router.get('/',auth,(req,res)=>{
    try{
        const user=req.user
        res.status(200).json(user)
    }catch(err){
        console.log(err.message)
        res.status(500).send('server error!')
    }
    
})


// @route      POST /auth
// @decription authenticate user and return token (login)
// @accsess    Public
router.post('/',[  
    check('email').isEmail().withMessage('Please include valid email'),
    check('password').exists().withMessage('must include password')
],
async(req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
   
    try{
        const {email,password}=req.body  
         let user=await User.findOne({email})

         if(!user){return res.status(400).send({errors:[{msg:'invalid credentails'}]})}   // to match errors from express-validator

         const isMatch=await bcrypt.compare(password,user.password)
         if(!isMatch){
            return res.status(400).send({errors:[{msg:'invalid credentails'}]})
         }

         payload={
             user:{
                 id:user.id
             }
         }
         jwt.sign(payload,config.get('jwtSecret'),{expiresIn:360000},(err,token)=>{
            if(err)throw err;
            res.json({token}); 
         }) 
         


    }
    catch(err){
        console.error(err.message)
        return res.status(500).send('server error!')
    }

  }
);



module.exports=router