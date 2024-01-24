const joi = require("joi");
const mongoose = require("mongoose");

const CommentModel = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "post",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", CommentModel);

function validateCreateComment (obj) {
    const Schema = joi.object({
        text: joi.string().required().trim(),
        postId : joi.string().required(),
    })

    return Schema.validate(obj)
}

function validateEditComment (obj) {
    const Schema = joi.object({
        text : joi.string().required().label("any")
    })


    return Schema.validate(obj)
}




module.exports = {
    Comment,
    validateCreateComment,
    validateEditComment
}