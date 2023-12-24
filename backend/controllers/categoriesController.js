const asyncHandler = require("express-async-handler")
const {Category , validateCreateCategory} = require("../models/Category")



/**
 * @desc create category
 * @route /api/categories/
 * @access private only admin
 * @method POST
 */
const createCategory = asyncHandler(async (req,res) => {
    const { error } = validateCreateCategory(req.body)
    if (error) {
        return res.status(400).json({message : error.details[0].message})
    }
    const category = await Category.create({
        title : req.body.title,
        user: req.user.id
    })
    res.status(201).json(category)
})


/**
 * @desc get All categories
 * @route /api/categories/
 * @access public
 * @method GET
 */
const getAllCategories = asyncHandler(async (req,res) => {
    const categories = await Category.find()
    res.status(200).json(categories)
})




/**
 * @desc delete category
 * @route /api/categories/
 * @access private
 * @method DELETE
 */
const deleteCategory = asyncHandler(async (req,res) => {
    const category = await Category.findById(req.params.id)
    if (!category) {
        return res.status(404).json({message : "category not found"})
    }
    await Category.findByIdAndDelete(req.params.id)
    res.status(200).json({message : "category deleted succefuly"})
}) 

module.exports = {
    createCategory,
    getAllCategories,
    deleteCategory
}