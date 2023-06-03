const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connection } = require("./connection/db");
const { userRouter } = require("./routes/user.routes");

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use("/users", userRouter);

app.listen(5000, async () => {
  await connection;
  console.log("server listening on 5000");
});
