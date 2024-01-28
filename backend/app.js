require("dotenv").config();
const express = require("express");
const connectToDB = require("./config/connectDB");
const cors = require("cors");
const { notFound, errorHandler } = require("./middlewares/error");
const { User } = require("./models/User");
const { Post } = require("./models/Post");
const xss = require("xss-clean")
const rateLimiting = require("express-rate-limit")
const helmet = require("helmet")
const hpp = require("hpp")


// connection to DB
connectToDB();

//init app
const app = express();

// middlewares
app.use(express.json());

// http param pulution
app.use(hpp())

// security headers
app.use(helmet())
// prevent xss attack

app.use(xss())

app.use(rateLimiting({
    windowMs : 10 * 60 * 1000 ,
    max : 100,
}))
// cors before route because front end is another domain he need to acces it
app.use(cors());


// routes

// auth route
app.use("/api/auth", require("./routes/authRouter"));

// users route

app.use("/api/users", require("./routes/usersRouter"));

// posts route

app.use("/api/posts", require("./routes/postsRouter"));
// comments route
app.use("/api/comments", require("./routes/commentsRouter"));
// category route
app.use("/api/categories", require("./routes/categoryRouter"));

// error handler middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`server is running in ${process.env.Node_ENV} at port ${PORT}`);
});
