import express from "express";
import ErrorHandler from "./middleware/error.js";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// test
app.use("/hello", function (req, res) {
  console.log("hello");
  return res.status(200).json({ msg: "Ok" });
});

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// routes import
// import userRouter from "./routes/user.routes.js";

// // import routes
// app.use("/api/users", userRouter);

// it's for ErrorHandling
app.use(ErrorHandler);

export { app };
