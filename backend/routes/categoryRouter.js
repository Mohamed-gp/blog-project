const {
  createCategory,
  getAllCategories,
  deleteCategory,
} = require("../controllers/categoriesController");
const validateObjectId = require("../middlewares/validateObjectId");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const demoAdmin = require("../middlewares/demoAdmin");
const router = require("express").Router();

router
  .route("/")
  .post(verifyTokenAndAdmin, demoAdmin, createCategory)
  .get(getAllCategories);
router
  .route("/:id")
  .delete(validateObjectId, verifyTokenAndAdmin, demoAdmin, deleteCategory);

module.exports = router;
