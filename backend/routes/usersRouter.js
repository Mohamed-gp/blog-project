const { getAllUsers, getUserById, updateUserProfile, getUsersCount, updateUserPhotoProfile, deleteUser } = require("../controllers/usersController")
const { verifyToken,verifyTokenAndAdmin, verifyTokenAndUser, verifyTokenAndUserAndAdmin } = require("../middlewares/verifyToken")
const validateObjectId = require("../middlewares/validateObjectId")
const photoUpload = require("../middlewares/photoUpload")

const router = require("express").Router()


router.route("/profile").get(verifyTokenAndAdmin,getAllUsers)

router.route("/profile/:id").get(validateObjectId,getUserById)
                            .put(validateObjectId,verifyTokenAndUser,updateUserProfile)
                            .delete(validateObjectId,verifyTokenAndUserAndAdmin,deleteUser)

router.route("/profile/profile-photo-upload").post(verifyToken,photoUpload.single("image"),updateUserPhotoProfile)

router.route("/count").get(verifyTokenAndAdmin,getUsersCount)

module.exports = router