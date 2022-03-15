const User = require("../models/User");

exports.listUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.send(users);
  } catch (error) {
    console.log("list users error is:", error.message);
    res.send(error.message);
  }
};
exports.registerUser = async (req, res) => {
  console.log("Add user body is", req.body);
  try {
    const newUser = new User(req.body);

    console.log("newUser is", newUser);

    await newUser.save();

    res.send({ success: true, newUser });
    // res.send({success: true, user})
  } catch (error) {
    console.log("Add user ERROR:", error.message);
    res.send(error.message);
  }
};

// Delete user from DB
exports.deleteUser = async (req, res) => {
  console.log("Add user query is", req.query);
  try {
    const deletedUser = await User.findByIdAndDelete(req.query.id);

    console.log("deleted user is", deletedUser);

    if (!deletedUser) return res.send({ success: false, errorId: 2 });

    res.send({ success: true });
    // res.send({success: true, user})
  } catch (error) {
    console.log("Delete user ERROR:", error.message);
    res.send(error.message);
  }
};
//LoginUser
exports.loginUser = async (req, res) => {
  try {
    console.log("req.body is", req.body);
    const { email, pass, username } = req.body;
    if (!(email || username) || !pass)
      return res.send({ success: false, errorId: 1 });
    const user = await User.findOne({
      $or: [{ email }, { username }],
      pass,
    }).select("-pass -__v");
    console.log("Login: user is", user);
    if (!user) return res.send({ success: false, errorId: 2 });
    res.send({ success: true, user });
  } catch (error) {
    console.log("Register ERROR:", error.message);
    res.send(error.message);
  }
};
exports.addFollower = async (req, res) => {
  try {
    console.log("follow user id is", req.params.userid);

    const { userid } = req.params;

    // 1. get the user
    const userToUpdate = await User.findById(userid);
    console.log("post to update BEFORE is", userToUpdate);

    // 2. update the followers array

    console.log("user to update is", userToUpdate);

    const idx = userToUpdate.followers.findIndex((item) => item == userid);

    console.log("idx IS", idx);
    // check if user is in the follower array
    if (idx > -1) {
      // -1 means that user not found in the array
      // if yes, then remove him
      userToUpdate.followers.splice(idx, 1);
    } else {
      // if no then add him
      userToUpdate.followers.push(userid);
    }

    // 3. update the user in the DB

    const user = await userToUpdate.save();

    console.log("user is", user);
    res.send({ success: true, user });
  } catch (error) {
    console.log("Like add ERROR", error.message);
    res.send(error.message);
  }
};
