const cloudinary = require("cloudinary")

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,

})

//  cloudinary upload image

const cloudinaryUploadImage = async (fileToUpload) => {
    try {
        // if all went right he will return data image and public id
        const data = await cloudinary.uploader.upload(fileToUpload,{
            resource_type : "auto",
        })
        return data
    } catch (error) {
        console.log(error)
        // to error handler catch this problem
        throw new Error("Internal Server Error (cloudinary)")
    }
}




//  cloudinary remove image

const cloudinaryRemoveImage = async (imagePublicId) => {
    try {
        // if all went right he will return data image and public id
        const result = await cloudinary.uploader.destroy(imagePublicId)
        return result
    } catch (error) {
        // to error handler catch this problem
        console.log(error)
        throw new Error("Internal Server Error (cloudinary)")
    }
}
//  cloudinary remove many images

const cloudinaryRemoveManyImages = async (publicIds) => {
    try {
        // if all went right he will return data image and public id
        const result = await cloudinary.v2.api.delete_all_resources(publicIds)
        return result
    } catch (error) {
        // to error handler catch this problem
        console.log(error)
        throw new Error("Internal Server Error (cloudinary)")
    }
}

module.exports = {
    cloudinaryUploadImage,
    cloudinaryRemoveImage,
    cloudinaryRemoveManyImages
}