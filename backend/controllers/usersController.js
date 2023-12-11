const { User, verifyUpdateUser } = require("../models/User");
// to not put try and catch 
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

/**
 * @desc get all users
 * @route /api/users/profile
 * @access private (only admin)
 * @method GET
 */

const getAllUsers = asyncHandler(async (req,res) => {
    const users = await User.find().select("-password")
    res.status(200).json(users)
});


/**
 * @desc get user by id
 * @route /api/users/profile/:id
 * @access public
 * @method GET
 */
const getUserById = asyncHandler(async (req,res) => {
    const user = await User.findById(req.params.id).select("-password")
    if (user) {
        return res.status(200).json(user)
    }
    res.status(404).json({message : "user not found"})
})





/**
 * @desc update user info
 * @route /api/users/profile/:id
 * @access private only user himself
 * @method PUT
 */
const updateUserProfile = asyncHandler(async (req,res) => {
    const { error }= verifyUpdateUser(req.body)
    if (error) {
        return res.status(400).json({message : error.details[0].message})
    }
    if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password,10)
    }

    const userUpdated = await User.findByIdAndUpdate(req.params.id,{
        $set : {
            username : req.body.username,
            password : req.body.password,
            email : req.body.email
        },
    },{new : true}).select("-password")
    
    res.status(200).json(userUpdated)
})


/**
 * @desc get users count
 * @route /api/users/counter
 * @access private only admin
 * @method GET
 */
const getUsersCount = asyncHandler(async (req,res) => {
    usersCount = await User.countDocuments()
    res.status(200).json(usersCount)
})


/**
 * @desc upload profile picture
 * @route /api/users/profile/profile-photo-upload
 * @access private only logged user
 * @method POST
 */
const updateUserPhotoProfile = asyncHandler(async (req,res) => {
    if (!req.file) {
        return res.status(400).json({message : "no file provided"})
    }

    res.status(200).json({message : "your profile photo uploaded successfully"})
})


module.exports = {
    getAllUsers,
    getUserById,
    updateUserProfile,
    getUsersCount,
    updateUserPhotoProfile
}