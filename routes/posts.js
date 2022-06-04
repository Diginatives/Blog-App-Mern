const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const { TestToken, TokenAndAuth} = require("../middle-ware/jwt-auth");





//getting all posts
router.get("/", async (req, res) => {
  
  try {
 
    let  posts = await Post.find();
   
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});





//creating post
router.post("/", TestToken, async (req, res) => {
 
  try {

    const newPost = new Post({
        title:req.body.title,
        postbody: req.body.postbody,
        username: req.body.username,
        postimg: req.body.postimg,
        category: req.body.category

    });
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//updating post
router.put("/:id",TestToken, async (req, res) => {

      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          { $set: req.body,},
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
  } 
  
);

//adding comment
router.post("/:id/comment", async (req, res) => {
  const id = req.params.id;
  const comment = req.body

   // get this particular post
   const postRelated = await Post.findById(id);
   // push the comment into the post.comments array
postRelated.comment.push(comment);
   // save and redirect...
await postRelated.save(function(err) {
if(err) {console.log(err)}

})
  
} 

);

//deleting post
router.delete("/:id", TestToken, async (req, res) => {

    const post = await Post.findById(req.params.id);
   
      try {
        await post.delete();
        res.status(200).json("Post deleted Sucessfully...");
      } catch (err) {
        res.status(500).json(err);
      }
    
});

//getting single post
router.get("/:id", TestToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router;