const { getAllUsers, getUserById, updateUserProfile } = require("../controllers/usersController")
const { verifyTokenAndAdmin, verifyTokenAndUser } = require("../middlewares/verifyToken")
const validateObjectId = require("../middlewares/validateObjectId")

const router = require("express").Router()


router.route("/profile").get(verifyTokenAndAdmin,getAllUsers)

router.route("/profile/:id").get(validateObjectId,getUserById)
                            .put(validateObjectId,verifyTokenAndUser,updateUserProfile)



module.exports = router