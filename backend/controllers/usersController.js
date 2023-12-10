const { User } = require("../models/User");
// to not put try and catch 
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken")

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
    console.log(user)
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
    // const {er} = validateUpdateUser(req)
})



module.exports = {
    getAllUsers,
    getUserById,
    updateUserProfile
}