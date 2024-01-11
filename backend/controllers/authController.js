const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { User, verifySignUp, verifyLogin } = require("../models/User");

/**
 * @desc signup new User
 * @route /api/auth/signup
 * @access public
 * @method POST
 */
const signUp = asyncHandler(async (req, res) => {
  const { error } = verifySignUp(req.body);
  if (error) {
    // 400 bad request => problem with user info
    return res.status(400).json({ message: error.details[0].message });
  }
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ message: "user already exist" });
  }
  // user is undefined here so we can use it
  user = new User({
    username: req.body.username,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 10),
  });
  await user.save();
  const token = user.generateAuthToken();

  // 201 => created succefully
  res.status(201).json({
    user: {
      _id: user._id,
      username: user.username,
      isAdmin: user.isAdmin,
      profilePhoto: user.profilePhoto,
      token,
    },
    message:
      "Congratulations! You have successfully signed up. you can explore our platform ",
  });
});

/**
 * @desc login User
 * @route /api/auth/login
 * @method POST
 * @access public
 */
const login = asyncHandler(async (req, res) => {
  const { error } = verifyLogin(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ message: "user not found you must sign up" });
  }
  const passwordMatched = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!passwordMatched) {
    return res.status(400).json({ message: "wrong password" });
  }

  const token = user.generateAuthToken();

  res.status(200).json({
    _id: user._id,
    username: user.username,
    isAdmin: user.isAdmin,
    profilePhoto: user.profilePhoto,
    token,
  });
});

module.exports = {
  signUp,
  login,
};
