const asyncHandler = require("express-async-handler");
const path = require("path");
const fs = require("fs");
const {
  Post,
  validateCreatePost,
  validateEditPost,
} = require("../models/Post");
const {
  cloudinaryUploadImage,
  cloudinaryRemoveImage,
} = require("../utils/cloudinary");

/**
 * @desc add new post
 * @route /api/posts
 * @method POST
 * @access private only user
 */

const addPost = asyncHandler(async (req, res) => {
  // 1. validation for image
  if (!req.file) {
    res.status(400).json({ message: "image not provided " });
  }
  // 2.  validation for data
  const { error } = validateCreatePost(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  }

  // 3. upload photo
  const imagePath = path.join(__dirname, `../${req.file.filename}`);
  const result = await cloudinaryUploadImage(imagePath);
  // 4. create post
  //   const post = await Post.create({
  //     title : ....
  //     ....
  //   })

  //  or this
  // const post = new Post({
  //     title : req.body.title.....
  // })
  // the difference is this we must do await post.save()
  const post = await Post.create({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    user: req.user.id,
    image: {
      url: result.secure_url,
      publicId: result.public_id,
    },
  });

  // 5. send response
  res.status(200).json(post);

  // 6. remove image from the server
  fs.unlinkSync(imagePath);
});

/**
 * @desc get all posts
 * @route /api/posts
 * @method GET
 * @access public
 */
const getAllPosts = asyncHandler(async (req, res) => {
  const postsPerPage = 3;
  const { pageNumber, category } = req.query;
  // if (category && pageNumber) {
  //   const posts = await Post.find({category : category}).limit(postsPerPage).skip((pageNumber - 1) * postsPerPage)
  //   return res.status(200).json(posts)
  // }
  // if (category) {
  //   pageNumber = 0
  //   const posts = await Post.find({category : category}).limit(postsPerPage).skip((pageNumber - 1) * postsPerPage)
  //   return res.status(200).json(posts)
  // }
  // if (pageNumber) {
  //   const posts = await Post.find().limit(postsPerPage).skip((pageNumber - 1) * postsPerPage)
  //   return res.status(200).json(posts)
  // }
  let posts;
  if (pageNumber) {
    posts = await Post.find()
      .limit(postsPerPage)
      .skip((pageNumber - 1) * postsPerPage)
      .sort({ createdAt: -1 })
      .populate("user", ["-password"]);
  } else if (category) {
    posts = await Post.find({ category })
      .sort({ createdAt: -1 })
      .populate("user", ["-password"]);
  } else {
    posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("user", ["-password"]);
  }
  res.status(200).json(posts);
});

/**
 * @desc get post by id
 * @route /api/posts/:id
 * @method GET
 * @access public
 */
const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate("user", [
    "-password",
  ]);
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }
  res.status(200).json(post);
});

/**
 * @desc get post by id
 * @route /api/posts/:id
 * @method GET
 * @access public
 */
const getCount = asyncHandler(async (req, res) => {
  const count = await Post.find().countDocuments();
  res.status(200).json(count);
});

/**
 * @desc delete post
 * @access private (only user himself and isAdmin)
 * @route /api/posts/:id
 * @method DELETE
 */
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "post not found " });
  }
  if (req.user.isAdmin || post.user.toString() == req.user.id) {
    await Post.findByIdAndDelete(req.params.id);
    await cloudinaryRemoveImage(post.image.publicId);
  }
  res
    .status(403)
    .json({
      message:
        "you don't have the permission to delete only admin and user himself",
    });
});

/**
 * @desc update post
 * @access private
 * @method PUT
 * @Route /api/posts/:id
 */
const editPost = asyncHandler(async (req, res) => {
  const { error } = validateEditPost(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }
  if (req.user.id !== post.user.toString()) {
    return res.status(403).json({message : "access denied you don't have the permission"})
  }
  const updatedPost = await Post.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title: req.body.title,
        description: req.body.description,
      },
      category : req.body.category
    },
    { new: true }
  ).populate("user",["-password"]);

  res.status(200).json(updatedPost)
});



const addWorkout = async (req, res) => {
  const { title, reps, load } = req.body;
  try {
    const workout = new Workout({
      title,
      reps,
      load,
    });
    const result = await workout.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.msg });
  }
};

const getWorkout = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ err: "no workout" });
    }
    const workout = await Workout.findById(req.params.id);

    //   if workout dosent exists
    if (!workout) {
      res.status(400);
      return res.json({ msg: "Workout Not Found" });
    }

    res.status(200).json(workout);
  } catch (error) {
    return res.status(404).json(error);
  }
};

const editWorkout = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ err: "no workout found by that id" });
  }
  const workout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!workout) {
    res.status(404);
    return res.json({ error: "error happend" });
  }
  res.json(workout);
};

const deleteWorkout = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ err: "no workout" });
  }
  const workout = await Workout.findByIdAndDelete(req.params.id);

  if (!workout) {
    return res.status(400).json({ error: "Workout Not found" });
  }

  res.status(200).json({ msg: "Workout Has Been Deleted" });
};


module.exports = {
  addPost,
  getAllPosts,
  getPostById,
  getCount,
  deletePost,
  editPost
};
