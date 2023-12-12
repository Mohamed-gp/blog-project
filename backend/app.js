require("dotenv").config()
const express = require("express")
const connectToDB = require("./config/connectDB")

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

const PORT = process.env.PORT || 9000
app.listen(PORT,() => {
    console.log(`server is running in ${process.env.Node_ENV} at port ${PORT}`)
})

