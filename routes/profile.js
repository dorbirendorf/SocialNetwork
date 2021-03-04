const express=require('express')
const router=express.Router()
const axios=require('axios')
const config=require('config')
const auth=require('../middleware/auth')
const Profile=require('../models/Profile')
const User=require('../models/User')
const { check ,validationResult } =require('express-validator')




// @route      GET /profile/me
// @decription get current user profile
// @accsess    private
router.get('/me',auth,async (req,res)=>{
    try{
        const profile=await Profile.findOne({user:req.user.id}).populate('user',['name','avatar'])

        if(!profile){
            return res.status(404).json({msg:'there is no profile for this user'})
        }
        res.status(200).json(profile)

    }catch(err){
        console.log(err.message)
        res.status(500).send('server error')
    }
})


// @route      Post /profile
// @decription add a profile
// @accsess    private
router.post('/',[auth,[
    //check('status','status is required').not().isEmpty(),
    check('skills','skills is requierd').not().isEmpty()
]],async (req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()})
    }
    // destructure req
    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
      } = req.body;
      // Build profile object with what i got
      const profileFields = {};
      profileFields.user = req.user.id;
      
      if (company) profileFields.company = company;
      if (website) profileFields.website = website;
      if (location) profileFields.location = location;
      if (bio) profileFields.bio = bio;
      if (status) profileFields.status = status;
      if (githubusername) profileFields.githubusername = githubusername;
      if (skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim());
      }
  
      // Build social object
      profileFields.social = {};
      if (youtube) profileFields.social.youtube = youtube;
      if (twitter) profileFields.social.twitter = twitter;
      if (facebook) profileFields.social.facebook = facebook;
      if (linkedin) profileFields.social.linkedin = linkedin;
      if (instagram) profileFields.social.instagram = instagram;

      //update or create profile
      try {
        // Using upsert option (creates new doc if no match is found):
        let profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true, upsert: true }
        );
        res.json(profile);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );



// @route      Get /profile
// @decription get all profiles
// @accsess    public

router.get('/',async (req,res)=>{
    try{
        profiles=await Profile.find().populate('user',['name','avatar'])
        res.json(profiles)

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route      Get /profile/user/:user_id
// @decription get  user profile by user id
// @accsess    public

router.get('/user/:user_id',async (req,res)=>{
    try{
        profile=await Profile.findOne({user:req.params.user_id}).populate('user',['name','avatar'])
        if(!profile){
            res.status(404).send('no such user')
        }
        res.json(profile)

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route      DELETE /profile/
// @decription delete  logged in user profile 
// @accsess    Private

router.delete('/',auth,async (req,res)=>{
    try{
        //remove profile
        await Profile.findOneAndRemove({user:req.user._id})
        //remove user
        await User.findOneAndRemove({_id:req.user._id})

        res.send('user removed')

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route    PUT api/profile/experience
// @desc     Add profile experience
// @access   Private
router.put(
    '/experience',
    [
      auth,
      [
        check('title', 'Title is required')
          .not()
          .isEmpty(),
        check('company', 'Company is required')
          .not()
          .isEmpty(),
        check('from', 'From date is required')
          .not()
          .isEmpty()
      ]
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
      } = req.body;
  
      const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
      };
  
      try {
        const profile = await Profile.findOne({ user: req.user.id });
  
        profile.experience.unshift(newExp);
  
        await profile.save();
  
        res.json(profile);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );

  router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        
        const foundProfile = await Profile.findOne({ user: req.user.id });
      
        // Filter exprience array using _id (NOTE: _id is a BSON type needs to be converted to string)
        // This can also be omitted and the next line and findOneAndUpdate to be used instead (above implementation)
        foundProfile.experience = foundProfile.experience.filter(exp => exp._id.toString() !== req.params.exp_id);
        
        await foundProfile.save();
        return res.status(200).json(foundProfile);
      
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Server error" });
    }
  });
  
  // @route    PUT api/profile/education
  // @desc     Add profile education
  // @access   Private
  router.put(
    '/education',
    [
      auth,
      [
        check('school', 'School is required')
          .not()
          .isEmpty(),
        check('degree', 'Degree is required')
          .not()
          .isEmpty(),
        check('fieldofstudy', 'Field of study is required')
          .not()
          .isEmpty(),
        check('from', 'From date is required')
          .not()
          .isEmpty()
      ]
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
      } = req.body;
  
      const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
      };
  
      try {
        const profile = await Profile.findOne({ user: req.user.id });
  
        profile.education.unshift(newEdu);
  
        await profile.save();
  
        res.json(profile);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );

  // @route    DELETE profile/education/:edu_id 
  // @desc     delete my profile education
  // @access   Private

  router.delete("/education/:edu_id", auth, async (req, res) => {
    try {
      const foundProfile = await Profile.findOne({ user: req.user.id });
      const eduIds = foundProfile.education.map(edu => edu._id.toString());
      // if i dont add .toString() it returns this weird mongoose coreArray and the ids are somehow objects and it still deletes anyway even if you put /education/5
      const removeIndex = eduIds.indexOf(req.params.edu_id);
      if (removeIndex === -1) {
        return res.status(500).json({ msg: "Server error" });
      } else {
    foundProfile.education.splice(
          removeIndex,
          1,
        );
        await foundProfile.save();
        return res.status(200).json(foundProfile);
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Server error" });
    }})

  // @route    get profile/github/:username
  // @desc     get github profile
  // @access   Public

  router.get('/github/:username', async (req, res) => {
    try {
      const uri = encodeURI(
        `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
      );
      const headers = {
        'user-agent': 'node.js',
        Authorization: `token ${config.get('githubToken')}`
      };
  
      const gitHubResponse = await axios.get(uri, { headers });
      return res.json(gitHubResponse.data);
    } catch (err) {
      console.error(err.message);
      return res.status(404).json({ msg: 'No Github profile found' });
    }
  });

module.exports=router