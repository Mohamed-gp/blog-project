const {
  addPost,
  getAllPosts,
  getPostById,
  getCount,
  deletePost,
  editPost,
  updatePostImage,
  toggleLike,
} = require("../controllers/postsController");
const photoUpload = require("../middlewares/photoUpload");
const validateObjectId = require("../middlewares/validateObjectId");
const { verifyToken } = require("../middlewares/verifyToken");

const router = require("express").Router();

router.route("/count").get(getCount);
router
  .route("/:id")
  .get(validateObjectId, getPostById)
  .delete(validateObjectId, verifyToken, deletePost)
  .put(validateObjectId, verifyToken, editPost);

router
  .route("/")
  .get(getAllPosts)
  .post(verifyToken, photoUpload.single("image"), addPost);

router
  .route("/upload-image/:id")
  .put(
    validateObjectId,
    verifyToken,
    photoUpload.single("image"),
    updatePostImage
  );

router.route("/likes/:id").put(validateObjectId, verifyToken, toggleLike);
module.exports = router;
