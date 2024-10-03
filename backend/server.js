require("dotenv").config();
const express = require("express");
const connectToDB = require("./config/connectDB");
const cors = require("cors");
const { notFound, errorHandler } = require("./middlewares/error");
const { User } = require("./models/User");
const { Post } = require("./models/Post");
const cookieParser = require("cookie-parser");
const xss = require("xss-clean");
const rateLimiting = require("express-rate-limit");
const helmet = require("helmet");
const hpp = require("hpp");

// connection to DB
connectToDB();

//init app
const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());

// http param pulution
app.use(hpp());

// security headers
app.use(helmet());
// prevent xss attack

app.use(xss());

app.use(
  rateLimiting({
    windowMs: 10 * 60 * 1000,
    max: 1000,
  })
);
// cors before route because front end is another domain he need to acces it
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? ["https://blog.production-server.tech/"]
        : ["http://localhost:5004"],
    credentials: true,
  })
);

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

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`server is running in ${process.env.NODE_ENV} at port ${PORT}`);
});
