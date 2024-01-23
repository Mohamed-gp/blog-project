const mongoose = require("mongoose");
const joi = require("joi");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      minlength: 5,
      maxlenght: 100,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      minlength: 5,
      trim: true,
      required: true,
    },
    image: {
      type: Object,
      default: {
        url: "",
        publicId: null,
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    // likes : [] it mean it array
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId, // we will store the id of any user put like
        ref: "user",
      },
    ],
    category: {
      type: String,
      required: true,
    },
    
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

postSchema.virtual("comments",{
    ref: "Comments",
    foreignField : "postId",
    localField : "_id"
})



// post model
const Post = mongoose.model("Post", postSchema);

// validate create Post

function validateCreatePost(obj) {
  const schema = joi.object({
    title: joi.string().trim().min(5).max(100).required(),
    description: joi.string().trim().min(5).required(),
    category: joi.string().trim().required(),
  });

  return schema.validate(obj);
}

const validateEditPost = (obj) => {
  const schema = joi.object({
    title: joi.string().trim().min(5).max(100),
    description: joi.string().trim().min(5),
    category: joi.string().trim(),
  });
  return schema.validate(obj);
};

module.exports = {
  Post,
  validateCreatePost,
  validateEditPost,
};
