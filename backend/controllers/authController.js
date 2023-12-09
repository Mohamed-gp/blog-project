const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { User , verifySignUp} = require("../models/User");


/**
 * @desc signup new User
 * @route /api/auth/signup
 * @access public
 * @method POST
 */
const signUp = asyncHandler(async (req,res) => {
    const { error } = verifySignUp(req.body)
    if (error) {
        // 400 bad request => problem with user info
        return res.status(400).json({message : error.details[0].message})
    }
    let user = await User.findOne ({email : req.body.email})
    if (user) {
        return res.status(400).json({message : "user already exist"})
    }
    // user is undefined here so we can use it 
    user = new User({
        username : req.body.username,
        email: req.body.email,
        password : await bcrypt.hash(req.body.password,10),

    })
    await user.save()
    // 201 => created succefully 
    res.status(201).json({message : "Congratulations! You have successfully signed up. you can login now "})
});




module.exports = {
    signUp
}