const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Post = require("../../models/Post");
const User = require("../../models/User");
const Profile = require("../../models/Profile");

//@route    POST api/posts
//@desc     Create a post
//@access   Private cuz you have to be logged in

router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //Find the user by the ID
      //select everything except the password
      const user = await User.findById(req.user.id).select("-password");

      //This is an object in oop const variableName = new {}; which is created by using the date in the database
      //aka instantziation this new object from the data in the model named Post
      const newPost = new Post({
        text: req.body.text, //text is from the body
        name: user.name, // name is from the user who is already registered so not from the body
        avatar: user.avatar,
        user: req.user.id //here its from the body
      });

      //saving the post
      const post = await newPost.save();

      //sending the data relevant to the post
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route    GET api/posts
//@desc     GET all posts
//@access   Private : you gotta logged in

router.get("/", auth, async (req, res) => {
  try {
    //find the posts and sort then by date. All these are happend inside the database
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route    GET api/posts/:id
//@desc     GET posts by ID
//@access   Private : you gotta logged in

router.get("/:id", auth, async (req, res) => {
  try {
    //find the posts. All these are happend inside the database aka server
    const post = await Post.findById(req.params.id); //req.params helps to get the id from the URL

    //checking if there's a post with that id
    //when no post
    if (!post) {
      return res.status(400).json({ msg: "Post is not found" });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "objectId") {
      //not a formated ID. here the error of certain kind
      return res.status(400).json({ msg: "Post is not found" });
    }
    res.status(500).send("Server Error");
  }
});

//@route    DELETE api/posts/:id
//@desc     DELETE a posts
//@access   Private : you gotta logged in

router.delete("/:id", auth, async (req, res) => {
  //all these in try and catch happen with the damn data in the database
  try {
    //find the posts and sort then by date. All these are happend inside the database
    const post = await Post.findById(req.params.id);

    if (!post) {
      //if the post is not found the following is carried through

      return res.status(400).json({ msg: "Post is not found" });
    }

    //only the post owner can delete the post
    //So checking the user
    if (post.user.toString() !== req.user.id) {
      //post.user is the owner of the post and req.user.id is the logged in user detected by the id
      //we ad toString() method to turn the posted users id to a string. why?
      //Well, the req.user.id aka the logged in user id is a string not and integer

      return res.status(401).json({
        msg:
          "User is not authorized to delete this post. Becuase you ain't the one who posted it!"
      });
    }

    //removing the post
    await post.remove();

    //sending the data to show in
    res.json({ msg: "Post removed" });

    res.json(posts);
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

//@route    PUT api/posts/like/:id
//@desc     Like a posts
//@access   Private : you gotta logged in

router.put("/like/:id", auth, async (req, res) => {
  try {
    //finding the post that's needed to be liked. Done by finding the id
    const post = await Post.findById(req.params.id);

    //checking if the past has already been liked by the same user
    //using filter method
    //is the liked user is same as the looged in user and is the likes given by him/her is more than zero?; that's what the below condition sys
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: "Post is already liked" });
    }

    //USer hasn't liked it?
    //unshift put the like on the begining
    //req.user.id adds the user to the array like
    post.likes.unshift({ user: req.user.id });

    //saving it back to the datasbse
    await post.save();
    //sending the data
    res.json(post.likes); //we get the id of the like and the id of the user
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

//@route    PUT api/posts/unlike/:id
//@desc     unlike a posts
//@access   Private : you gotta logged in

router.put("/unlike/:id", auth, async (req, res) => {
  try {
    //finding the post that's needed to be liked. Done by finding the id
    const post = await Post.findById(req.params.id);

    //checking if the past has already been liked by the same user
    //using filter method
    //is the liked user is same as the looged in user and is the likes given by him/her equal to zero?; that's what the below condition sys
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length ===
      0
    ) {
      return res.status(400).json({ msg: "Post has not been  liked yet" });
    }

    //Getting the remove index,index of the post that's needed to be removed
    //instead of adding a like we need to remove a like

    const removeIndex = post.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id); //getting the id of the user who has liked it, then removing it

    post.likes.splice(removeIndex, 1); //removing it from the array

    //saving it back to the datasbse
    await post.save();
    //sending the data
    res.json(post.likes); //we get the id of the like and the id of the user
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

//adding comments

//@route    POST api/posts/comments/:id
//@desc     Commenting on a post
//@access   Private cuz you have to be logged in

router.post(
  "/comments/:id",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //Find the user by the ID
      //select everything except the password
      const user = await User.findById(req.user.id).select("-password"); //All these deals with the backend
      const post = await Post.findById(req.params.id);

      //Let's create a new comment here. A new object
      const newComment = {
        // not a collection on the database. this is an object we're creating
        text: req.body.text, //text is from the body
        name: user.name, // name is from the user who is already registered so not from the body
        avatar: user.avatar,
        user: req.user.id //here its from the body
      };

      //adding this comment coming from the newComment to the post. Unshift means adding to the first of the array "comments" in the database model Posts
      //unshif the new comment to thearray comments
      post.comments.unshift(newComment); // this comments come from the database mode's array named "comments"

      await post.save();

      //sending the data relevant to the post
      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route    DELETE api/posts/comments/:id/:comment_id, ;  :id => this is the post id
//@desc     DEleting a comment
//@access   Private cuz you have to be logged in

router.delete("/comments/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //pullung out all the comments
    // Check all the available comments (comment =>) and see whether you found the usser-requested comment.
    //Found? Then assign it to the variable comment
    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id
    );

    //if not found?

    if (!comment) {
      return res.status(404).json({ msg: "Comment doesn't exist!" });
    }

    // is the user logged in is same as the one who posted the comment? If not. tostring convert the comment user id to a string
    if (comment.user.toString() !== req.user.id) {
      //params is used for url while just req is for what's inside the app

      return res.status(401).json({ msg: "User is not authorized" }); //error
    }

    //Finally removing the comment
    const removeIndex = post.comments
      .map(comment => comment.user.toString()) // sorting through each comment of us. comment is a variable that you create
      .indexOf(req.user.id); //getting the id of the user who has commented, then removing it

    post.comments.splice(removeIndex, 1); //removing it from the array coments

    //saving it back to the datasbse
    await post.save();
    //sending the data

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

module.exports = router;
