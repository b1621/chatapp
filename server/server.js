const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const userRouter = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
connectDB();

const port = process.env.PORT || 3033;
const app = express();
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes.js");

const allowedOrigins = ["http://localhost:3000"];

app.use(
  cors({
    origin: "",
    // origin: (origin, callback) => {
    //   if (allowedOrigins.includes(origin)) {
    //     callback(null, true);
    //   } else {
    //     callback(new Error("Not allowed by CORS"));
    //   }
    // },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.get("/", () => console.log("hello world"));
app.use("/api/v1/user", userRoutes);
// app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port} ...`));
