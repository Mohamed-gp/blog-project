const {
  createComment,
  getAllComments,
  deleteComment,
  updateComment,
} = require("../controllers/commentsController");
const {
  verifyToken,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");

const demoAdmin = require("../middlewares/demoAdmin");
const validateObjectId = require("../middlewares/validateObjectId");

const router = require("express").Router();

router
  .route("/")
  .post(verifyToken, createComment)
  .get(verifyTokenAndAdmin, getAllComments);

router
  .route("/:id")
  .delete(validateObjectId, verifyToken, demoAdmin, deleteComment)
  .put(validateObjectId, verifyToken, updateComment);

module.exports = router;
