const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");
const { TestToken, TokenAndAuth} = require("../middle-ware/jwt-auth");



//updating user
router.put("/:id", TokenAndAuth, async (req, res) => {
 
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }

});



//deleting
router.delete("/:id", TokenAndAuth, async (req, res) => {
 
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("User not found!");
    }
  
});

//getting single user
router.get("/:id", TokenAndAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});



//getting all users
router.get("/", TestToken, async (req, res) => {
    
    try {
       let allUsers = await User.find();
       res.status(200).json(allUsers);
    
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;