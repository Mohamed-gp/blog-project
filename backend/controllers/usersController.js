const { User, verifyUpdateUser } = require("../models/User");
const fs = require("fs");
// to not put try and catch
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const path = require("path");
const {
  cloudinaryUploadImage,
  cloudinaryRemoveImage,
  cloudinaryRemoveManyImages,
} = require("../utils/cloudinary");
const { Comment } = require("../models/Comment");
const { Post } = require("../models/Post");

/**
 * @desc get all users
 * @route /api/users/profile
 * @access private (only admin)
 * @method GET
 */

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").populate("posts");
  res.status(200).json(users);
});

/**
 * @desc get user by id
 * @route /api/users/profile/:id
 * @access public
 * @method GET
 */
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
    .select("-password")
    .populate({
      path: "posts",
      populate: {
        path: "user",
      },
    });
  if (user) {
    return res.status(200).json(user);
  }
  res.status(404).json({ message: "user not found" });
});

/**
 * @desc update user info
 * @route /api/users/profile/:id
 * @access private only user himself
 * @method PUT
 */
const updateUserProfile = asyncHandler(async (req, res) => {
  const { error } = verifyUpdateUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, 10);
  }

  const userUpdated = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        username: req.body.username,
        password: req.body.password,
        bio: req.body.bio,
      },
    },
    { new: true }
  )
    .select("-password")
    .populate("posts");

  res.status(200).json(userUpdated);
});

/**
 * @desc get users count
 * @route /api/users/count
 * @access private only admin
 * @method GET
 */
const getUsersCount = asyncHandler(async (req, res) => {
  const usersCount = await User.countDocuments();
  res.status(200).json(usersCount);
});

/**
 * @desc upload profile picture
 * @route /api/users/profile/profile-photo-upload
 * @access private only logged user
 * @method POST
 */
const updateUserPhotoProfile = asyncHandler(async (req, res) => {
  // 1. validation

  if (!req.file) {
    return res.status(400).json({ message: "no file provided" });
  }
  // 2.get the path to the image
  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
  // 3.upload to cloudinary
  const result = await cloudinaryUploadImage(imagePath);

  // 4.get the user from db
  const user = await User.findById(req.user.id);
  // 5.delete the old profile photo if exist
  // if (user.profilePhoto.publicId !== null) {
  //   await cloudinaryRemoveImage(user.profilePhoto.publicId);
  // }
  // 6.change the profilephoto field in the db
  user.profilePhoto = {
    publicId: result.public_id,
    url: result.secure_url,
  };
  await user.save();
  // 7.send response to client
  res.status(200).json({
    message: "your profile photo uploaded successfully",
    profilePhoto: {
      publicId: result.public_id,
      url: result.secure_url,
    },
  });
  // 8.remove image from the server

  fs.unlinkSync(imagePath);
});

/**
 * @desc remove user profile
 * @route /api/users/profile/:id
 * @access private only admin and user himself
 * @method DELETE
 */

const deleteUser = asyncHandler(async (req, res) => {
  // 1- get the user from db
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
  // 2- get all posts from db
  const posts = await Post.find({ user: user._id });

  // 3- get the public ids from the posts
  // video number 20
  const publicIds = posts?.map((post) => post?.image?.publicId);
  // 4- delete all postsimage from couldinary that belong to this user
  if (publicIds.length > 0) {
    await cloudinaryRemoveManyImages(publicIds);
  }
  // 5- delete the profile picture from cloudinary
  if (user.profilePhoto.publicIds != null) {
    await cloudinaryRemoveImage(user?.profilePhoto?.publicId);
  }
  // 6- delete user posts & comments
  await Comment.deleteMany({ user: user._id });
  await Post.deleteMany({ user: user._id });
  // 7- delete the user himself
  await User.findByIdAndDelete(req.user.id);
  // 8- send a response to the client
  res.status(200).json({ message: "user deleted succefuly" });
});

module.exports = {
  getAllUsers,
  getUserById,
  updateUserProfile,
  getUsersCount,
  updateUserPhotoProfile,
  deleteUser,
};
