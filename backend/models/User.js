const mongoose = require("mongoose");
const joi = require("joi");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 100,
      unique: true,
    },
    password: {
      type: String,
      minlength: 8,
      maxlength: 100,
      required: true,
      trim: true,
    },
    profilePhoto: {
      type: Object,
      default: {
        url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png ",
        publicId: null,
      },
    },
    bio: String, // or bio: {type:String }, when we have only one value we can do it like this
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isAccountVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
); // to add 2 properties created at and updated at

UserSchema.virtual("posts", {// new propertie : posts : []
  ref: "Post", // reference to Post model
  foreignField: "user",
  localField: "_id",// get all post that have user == _id 
});

// generate auth token
UserSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id, isAdmin: this.isAdmin }, process.env.JWT_KEY);
};

const User = mongoose.model("user", UserSchema); // mongo db will add s and make it in small case and add document with the name users that have UserSchema

const verifySignUp = (object) => {
  const emailSchema = joi.object({
    username: joi.string().required().trim().min(2).max(100),
    email: joi.string().required().trim().min(5).max(100).email(),
    password: joi.string().required().trim().min(8).max(100),
    // profilePhoto: joi.object().default({
    //     url : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png ",
    //     publicId: null,
    // }),
    // bio: joi.string(),
    // isAdmin: joi.bool().default(false),
    // isAccountVerified: joi.bool().default(false)
  });

  return emailSchema.validate(object);
};
const verifyLogin = (obj) => {
  const loginSchema = joi.object({
    email: joi.string().required().trim().min(5).max(100).email(),
    password: joi.string().required().trim().min(8).max(100),
  });

  return loginSchema.validate(obj);
};

const verifyUpdateUser = (obj) => {
  const schema = joi.object({
    username: joi.string().trim().min(2).max(100),
    password: joi.string().trim().min(8),
    bio: joi.string(),
  });
  return schema.validate(obj);
};

module.exports = {
  User,
  verifySignUp,
  verifyLogin,
  verifyUpdateUser,
};
