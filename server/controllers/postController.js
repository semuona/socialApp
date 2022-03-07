const Post = require("../models/Posts");

exports.addPost = async (req, res) => {
  try {
    console.log("posts/add body is", req.body);

    const newPost = new Post(req.body);

    const post = await newPost
      .save()
      .then((item) => item.populate({ path: "owner", select: "username" }));

    if (!post) return res.send({ success: false, errorId: 2 });

    res.send({ success: true, post });
  } catch (error) {
    console.log("Posts add ERROR", error.message);
    res.send(error.message);
  }
};

exports.listPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    /*  .populate({
      path: "owner",
      select: "username",
    }); */

    res.send(posts);
  } catch (error) {
    console.log("Posts list ERROR", error.message);
    res.send(error.message);
  }
};
