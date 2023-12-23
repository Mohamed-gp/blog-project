const {
  createComment,
  getAllComments,
  deleteComment,
} = require("../controllers/commentsController");
const {
  verifyToken,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");

const validateObjectId = require("../middlewares/validateObjectId");


const router = require("express").Router();

router
  .route("/")
  .post(verifyToken, createComment)
  .get(verifyTokenAndAdmin, getAllComments);


router.route("/:id").delete(validateObjectId,verifyToken,deleteComment)

module.exports = router;
