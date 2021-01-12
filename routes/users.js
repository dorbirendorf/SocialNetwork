const express=require('express')
const router=express.Router()
const { check ,validationResult } =require('express-validator')
const gravatar=require('gravatar')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const config=require('config')
const User=require('../models/User')
const auth = require('../middleware/auth')



// @route      POST /users
// @decription create user and return token 
// @accsess    Public
router.post('/',[  
    check('name').not().isEmpty().withMessage('Name is required!'),
    check('email').isEmail().withMessage('Please include valid email'),
    check('password').isLength({min:5}).withMessage('password must be at least 5 chars')
],
async(req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
   
    try{
        const {email,password,name}=req.body  
         let existUser=await User.findOne({email})

         if(existUser){return res.status(400).send({errors:[{msg:'user allready exist'}]})}   // to match errors from express-validator
         
         const avatar=gravatar.url(email,{
             s:'200',
             r:'pg',
             d:'mm'
         })

         const user=new User(
             {name,email,password,avatar}
         )
         const salt=await bcrypt.genSalt()
         user.password=await bcrypt.hash(password,salt)
         await user.save()

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