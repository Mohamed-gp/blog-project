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

  user.password = "";
  res
    .cookie("blog-token", token, {
      httpOnly: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 365,
      secure: process.env.NODE_ENV == "development" ? false : true,
      domain:
        process.env.NODE_ENV == "development"
          ? "localhost"
          : "production-server.tech",
    })
    .status(201)
    .json({
      data: user,
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
  user.password = "";
  res
    .status(200)
    .cookie("blog-token", token, {
      httpOnly: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 365,
      secure: process.env.NODE_ENV == "development" ? false : true,
      domain:
        process.env.NODE_ENV == "development"
          ? "localhost"
          : "production-server.tech",
    })
    .json({
      data: user,
      message: "login successfully",
    });
});

/**
 *
 * @METHOD POST
 * @ROUTE /api/auth/google
 * @DESC Google Sign In
 * @ACCESS Public
 */
const googleSignInController = asyncHandler(async (req, res, next) => {
  const { username, email, profilePhoto } = req.body;
  let user = await User.findOne({
    email,
  });

  if (user) {
    const token = user.generateAuthToken();
    user.password = "";
    console.log(
      process.env.NODE_ENV == "development"
        ? "localhost"
        : "production-server.tech"
    );
    return res
      .cookie("blog-token", token, {
        httpOnly: true,
        sameSite: "None",
        secure: process.env.NODE_ENV === "development" ? false : true,
        domain:
          process.env.NODE_ENV == "development"
            ? "localhost"
            : "production-server.tech",
      })
      .json({ data: user, message: "login successfully" })
      .status(200);
  } else {
    const generatedPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);

    user = new User({
      email,
      username,
      password: await bcrypt.hash(generatedPassword, 10),
      provider: "google",
      profilePhoto: {
        publicId: "image" + profilePhoto,
        url: profilePhoto,
      },
    });
    await user.save();
    const token = user.generateAuthToken();
    user.password = "";
    return res
      .cookie("blog-token", token, {
        httpOnly: true,
        sameSite: "None",
        secure: process.env.NODE_ENV === "development" ? false : true,
        domain:
          process.env.NODE_ENV == "development"
            ? "localhost"
            : "production-server.tech",
      })
      .json({ data: user, message: "user created successfully" })
      .status(201);
  }
});

const logout = asyncHandler(async (req, res) => {
  res
    .clearCookie("blog-token", {
      httpOnly: true,
      sameSite: "none",
      secure: process.env.NODE_ENV == "development" ? false : true,
      domain:
        process.env.NODE_ENV == "development"
          ? "localhost"
          : "production-server.tech",
    })
    .status(200)
    .json({ data: null, message: "logout successfully" });
});

module.exports = {
  signUp,
  login,
  googleSignInController,
  logout,
};
