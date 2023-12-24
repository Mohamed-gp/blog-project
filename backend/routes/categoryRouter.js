const { createCategory, getAllCategories, deleteCategory } = require("../controllers/categoriesController")
const validateObjectId = require("../middlewares/validateObjectId")
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken")

const router = require("express").Router()

router.route("/").post(verifyTokenAndAdmin,createCategory)
                 .get(getAllCategories)
router.route("/:id").delete(validateObjectId,verifyTokenAndAdmin,deleteCategory)

module.exports = router