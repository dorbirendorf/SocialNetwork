const express=require('express')
const router=express.Router()
const { check ,validationResult } =require('express-validator')
const auth=require('../middleware/auth')
const Profile=require('../models/Profile')
const User=require('../models/User')
const Post=require('../models/Post')



// @route      POST /posts
// @decription POST a post
// @accsess    Private
router.post('/',[auth,[
    check('text',"text is requierd").not().isEmpty(),

]],async (req,res)=>{
    const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      try{
      const user=await User.findById(req.user.id).select('-password')
      const new_post=new Post({
          text:req.body.text,
          name:user.name,
          avatar:user.avatar,
          user:user.id
      })
      const post=await new_post.save()
      res.status(200).json(post)

    }catch(err){
        console.log(err.message)
        res.status(500).send('server error')
    }
     
})

// @route      Get /posts
// @decription get all posts
// @accsess    public
router.get('/',async(req,res)=>{
    try{
        posts=await Post.find().sort({data:-1})
        res.status(200).json(posts)

    }catch(err){
        console.log(err.message)
        res.status(500).send('server error')
    }
})

// @route      Get /posts/:post_id
// @decription get a post by Id
// @accsess    public
router.get('/:post_id',async(req,res)=>{
    try{
        const mypost=await Post.findById(req.params.post_id)
        if(!mypost){
            res.status(404).json({msg:'cant find this post'})
        }
        res.status(200).json(mypost)
    }catch(err){
        console.log(err.message)
        res.status(500).send('server error')
    }
})

// @route      DELETE /posts/:post_id
// @decription delete a post by Id
// @accsess    private
router.delete('/:post_id',auth,async(req,res)=>{
    try{
        const post=await Post.findById(req.params.post_id)
        if(post.user.toString()!==req.user.id){
           return res.status(401).json({msg:'you cant delete this post madafaka!'})
        }
        await post.remove()
        return res.status(200).json({msg:'post deleted'})


    }catch(err){
        console.log(err.message)
        res.status(500).send('server error')
    }
})

// @route      PUT /posts/like/:post_id
// @decription like a post 
// @accsess    private
router.put('/like/:post_id',auth,async(req,res)=>{

    try{
        const post=await Post.findById(req.params.post_id) 
        //check its not already liked by this user(cant like twice)
        if(post.likes.filter(like=>like.user.toString()==req.user.id).length>0){
            return res.status(401).json({msg:'you cant like twice madafacka!'})
        }
        const new_like={
            user:req.user.id
        }
        post.likes.unshift(new_like)
        await post.save()
        res.json(post.likes)


    }catch(err){
        console.log(err.message)
        res.status(500).send('server error')
    }
})

// @route      PUT /posts/unlike/:post_id
// @decription unlike a post 
// @accsess    private
router.put('/unlike/:post_id',auth,async(req,res)=>{

    try{
        let post=await Post.findById(req.params.post_id) 
        //check its not already liked by this user(cant like twice)
        if(post.likes.filter(like=>like.user.toString()==req.user.id).length==0){
            res.status(401).json({msg:'post has not yet been liked'})
        }

        post.likes = post.likes.filter( (like) => like.user.toString() !== req.user.id );
        await post.save()
        res.json(post.likes)


    }catch(err){
        console.log(err.message)
        res.status(500).send('server error')
    }
})


// @route      PUT /posts/comment/:post_id
// @decription comment on  a post 
// @accsess    private
router.put('/comment/:post_id',[auth,[
    check('text','commnet text is requied').not().isEmpty()
]],async(req,res)=>{

    const errors=validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()})
    }

    try{
        const post=await Post.findById(req.params.post_id) 
        
        const new_comment={
            user:req.user.id,
            name:req.user.name,
            avatar:req.user.avatar,
            text:req.body.text
        }

        post.comments.unshift(new_comment)
        await post.save()
        res.json(post.comments)


    }catch(err){
        console.log(err.message)
        res.status(500).send('server error')
    }
})

// @route    DELETE api/posts/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
  
      // Pull out comment
      const comment = post.comments.find(
        (comment) => comment.id === req.params.comment_id
      );
      // Make sure comment exists
      if (!comment) {
        return res.status(404).json({ msg: 'Comment does not exist' });
      }
      // Check user
      if (comment.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
  
      post.comments = post.comments.filter(
        ({ id }) => id !== req.params.comment_id
      );
  
      await post.save();
  
      return res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  });
  

module.exports=router