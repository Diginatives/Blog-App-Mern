const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { TokenAndAdmin } = require("../middle-ware/jwt-auth");


//Registering new user
router.post("/register",TokenAndAdmin, async (req, res)=>{

    try {

        //password hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
         const newUser = new User({
             username: req.body.username,
             email: req.body.email,
             password: hashedPassword,
             isAdmin: req.body.isAdmin,
             profilePic: req.body.profilePic
         })

         const user = await newUser.save(); 
         res.status(200).json(user)
    }catch (err){
        res.status(500).json(err);
    }
})



//login
router.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if(!user){  
        res.status(400).json("Wrong credentials!");
        return;
      }
  
      const validated = await bcrypt.compare(req.body.password, user.password);
      if(!validated){  
      res.status(400).json("Wrong credentials!")
      return;
      }
  
      const accessToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_KEY,
        {expiresIn:"1d"}
      );
  
      const { password, ...others } = user._doc;
  
      res.status(200).json({...others, accessToken});
    } catch (err) {
      res.status(500).json(err);
    }
  });



module.exports= router;