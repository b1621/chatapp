const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const userRouter = require("./routes/userRouter");

const port = process.env.PORT || 3033;
const app = express();

app.use("/api/v1/user", userRouter);

app.listen(port, () => console.log(`Server started on port ${port} ...`));
