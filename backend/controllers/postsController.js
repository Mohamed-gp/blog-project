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




module.exports.toggleLikeCtrl = asyncHandler(async (req, res) => {
  const loggedInUser = req.user.id;
  const { id: postId } = req.params;

  let post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }

  const isPostAlreadyLiked = post.likes.find(
    (user) => user.toString() === loggedInUser
  );

  if (isPostAlreadyLiked) {
    post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { likes: loggedInUser },
      },
      { new: true }
    );
  } else {
    post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { likes: loggedInUser },
      },
      { new: true }
    );
  }

  res.status(200).json(post);
});


/**-----------------------------------------------
 * @desc    Send Reset Password Link
 * @route   /api/password/reset-password-link
 * @method  POST
 * @access  public
 ------------------------------------------------*/
 module.exports.sendResetPasswordLinkCtrl = asyncHandler(async (req,res) => {
  // 1. Validation
  const { error } = validateEmail(req.body);
  if(error) {
   return res.status(400).json({ message: error.details[0].message });
  }

  // 2. Get the user from DB by email
  const user = await User.findOne({ email: req.body.email });
  if(!user) {
   return res.status(404).json({ message: "User with given email does not exist!" });
  }

  // 3. Creating VerificationToken
  let verificationToken = await VerificationToken.findOne({ userId: user._id });
  if(!verificationToken) {
   verificationToken = new VerificationToken({
       userId: user._id,
       token: crypto.randomBytes(32).toString("hex"),
   });
   await verificationToken.save();
  }

  // 4. Creating link
  const link = `${process.env.CLIENT_DOMAIN}/reset-password/${user._id}/${verificationToken.token}`;
  // 5. Creating HMTL template
  const htmlTemplate = `<a href="${link}">Click here to reset your password</a>`;
  // 6. Sending Email
  await sendEmail(user.email,"Reset Password",htmlTemplate);
  // 7. Response to the client
  res.status(200).json({
   message: "Password reset link sent to your email, Please check your inbox"
  })
});

/**-----------------------------------------------
* @desc    Get Reset Password Link
* @route   /api/password/reset-password/:userId/:token
* @method  GET
* @access  public
------------------------------------------------*/
module.exports.getResetPasswordLinkCtrl = asyncHandler(async (req,res) => {
   const user = await User.findById(req.params.userId);
   if(!user) {
       return res.status(400).json({ message: "invalid link" });
   }

   const verificationToken = await VerificationToken.findOne({
       userId: user._id,
       token: req.params.token,
   });
   if(!verificationToken) {
       return res.status(400).json({ message: "invalid link" });
   }
   
   res.status(200).json({ message: "Valid url" });
});

/**-----------------------------------------------
* @desc    Reset Password
* @route   /api/password/reset-password/:userId/:token
* @method  POST
* @access  public
------------------------------------------------*/
module.exports.resetPasswordCtrl = asyncHandler(async (req,res) => {
  const { error } = validateNewPassword(req.body);
  if(error) {
   return res.status(400).json({ message: error.details[0].message });
  }

  const user = await User.findById(req.params.userId);
  if(!user) {
   return res.status(400).json({ message: "invalid link" });
  }

  const verificationToken = await VerificationToken.findOne({
   userId: user._id,
   token: req.params.token,
  });
  if(!verificationToken) {
   return res.status(400).json({ message: "invalid link" });
  }

  if(!user.isAccountVerified) {
   user.isAccountVerified = true;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  user.password = hashedPassword;
  await user.save();
  await verificationToken.remove();

  res.status(200).json({ message: "Password reset successfully, please log in" });
});

module.exports = {
  addPost,
  getAllPosts,
  getPostById,
  getCount,
  deletePost,
  editPost
};
