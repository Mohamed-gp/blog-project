const asyncHandler = require("express-async-handler");

const {
  Comment,
  validateCreateComment,
  validateEditComment
} = require("../models/Comment");
const { User } = require("../models/User");

/**
 * @desc create comment
 * @route /api/comments/
 * @access private only logged in
 * @method POST
 */
const createComment = asyncHandler(async (req, res) => {
  const { error } = validateCreateComment(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const profile = await User.findById(req.user.id);

  const comment = await Comment.create({
    postId: req.body.postId,
    text: req.body.text,
    user: req.user.id,
    username: profile.username,
  });

  res.status(201).json(comment);
});


/**
 * @desc getAllComments
 * @route /api/comments/
 * @access private only admin
 * @method get
 */
const getAllComments = asyncHandler(async (req,res) => {
    const comments = await Comment.find().populate("user")

    res.status(200).json(comments)
});




/**
 * @desc delete Comment
 * @route /api/comments/:id
 * @access private only admin and user himself
 * @method DELETE
 */
const deleteComment = asyncHandler(async (req,res) => {
    const comment = await Comment.findById(req.params.id)
    if (!comment) {
        return res.status(404).json({message : "comment not found"})
    }
    if (req.user.isAdmin || comment.user. toString() == req.user.id) {
        await Comment.findByIdAndDelete(req.params.id)
        return res.status(200).json({message : "deleted succefuly"})
    }
    res.status(403).json({message : "you are not allowed only admin and user by himself"})
});




/**
 * @desc update Comment
 * @route /api/comments/:id
 * @access private only user himself
 * @method PUT
 */
const updateComment = asyncHandler(async (req,res) => {
  const { error } = validateEditComment(req.body)
  if (error) {
    return res.status(400).json({message : error.details[0].message})
  }
  const comment = await Comment.findById(req.params.id)
  if (!comment) {
    return res.status(404).json({message : "comment not found"})
  }
  if (req.user.id != comment.user.toString()) {
    return res.status(403).json({message : "access denied, only user can edit his comment"})
  }
  const updatedComment = await Comment.findByIdAndUpdate(req.params.id,{
    $set : {
      text : req.body.text
    }
  },{new : true})
  res.status(200).json(updateComment)
})






module.exports = {
  createComment,
  getAllComments,
  deleteComment,
  updateComment
};
