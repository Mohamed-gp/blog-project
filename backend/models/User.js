const mongoose = require("mongoose")
const joi = require("joi")

const UserSchema = new mongoose.Schema({
    username: {
        type : String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100,
    },
    email:{
        type: String,
        required: true,
        trim: true,
        minlength : 5,
        maxlength : 100,
        unique : true
    },
    password: {
        type: String,
        minlength : 8,
        maxlength : 100,
        required: true,
        trim: true,

    },
    profilePhoto : {
        type : Object,
        default: {
            url : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png ",
            publicId: null,
        }

    },
    bio: String,// or bio: {type:String }, when we have only one value we can do it like this
    isAdmin: {
        type : Boolean,
        default : false,
    },
    isAccountVerified: {
        type: Boolean,
        default : false,
    }

},{timestamps: true}) // to add 2 properties created at and updated at 


const User = mongoose.model("user",UserSchema) // mongo db will add s and make it in small case and add document with the name users that have UserSchema


const verifySignUp = (object) => {
    const emailSchema = joi.object({
        username: joi.string().required().trim().min(2).max(100),
        email: joi.string().required().trim().min(5).max(100),
        password: joi.string().required().trim().min(8).max(100),
        // profilePhoto: joi.object().default({
        //     url : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png ",
        //     publicId: null,
        // }),
        // bio: joi.string(),
        // isAdmin: joi.bool().default(false),
        // isAccountVerified: joi.bool().default(false)

    })

    return emailSchema.validate(object)
}







module.exports = {
    User,
    verifySignUp
    
}