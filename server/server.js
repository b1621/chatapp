const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const userRouter = require("./routes/userRouter");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
connectDB();

const port = process.env.PORT || 3033;
const app = express();

const allowedOrigins = ["http://localhost:5173"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/user", userRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port} ...`));
