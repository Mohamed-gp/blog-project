const mongoose = require("mongoose")
const joi = require("joi")

const CategorySchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title : {
        type : String,
        required: true,
        trim: true
    }  
},{
    timestamps: true 
})


const Category = mongoose.model("category",CategorySchema)


function validateCreateCategory (obj) {
    const Schema = joi.object({
        title : joi.string().trim().required().label("Title")
    })
    return Schema.validate(obj)
}

module.exports = {
    Category,
    validateCreateCategory
}