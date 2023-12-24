require("dotenv").config()
const express = require("express")
const connectToDB = require("./config/connectDB")
const { notFound, errorHandler } = require("./middlewares/error")

// connection to DB
connectToDB()

//init app
const app = express()

// middlewares
app.use(express.json())



// routes 

// auth route
app.use("/api/auth",require("./routes/authRouter"))

// users route

app.use("/api/users",require("./routes/usersRouter"))

// posts route
app.use("/api/posts",require("./routes/postsRouter"))
// comments route
app.use("/api/comments",require("./routes/commentsRouter"))
// category route
app.use("/api/categories",require("./routes/categoryRouter"))


// error handler middlewares
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 9000
app.listen(PORT,() => {
    console.log(`server is running in ${process.env.Node_ENV} at port ${PORT}`)
})

