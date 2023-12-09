const mongoose = require("mongoose")


module.exports = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connected succefully to mongoDB")
    } catch (error) {
        console.log(error)
        console.log("connection failed to Mongodb!",error)
    }
}