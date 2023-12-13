const {
  addPost,
  getAllPosts,
  getPostById,
  getCount,
  deletePost
} = require("../controllers/postsController");
const photoUpload = require("../middlewares/photoUpload");
const validateObjectId = require("../middlewares/validateObjectId");
const { verifyToken } = require("../middlewares/verifyToken");

const router = require("express").Router();

router.route("/count").get(getCount)
router.route("/:id").get(validateObjectId, getPostById)
                    .delete(validateObjectId, verifyToken, deletePost)

router
  .route("/")
  .get(getAllPosts)
  .post(verifyToken, photoUpload.single("image"), addPost)

module.exports = router;
