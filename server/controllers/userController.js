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
