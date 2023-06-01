const express = require("express");
const bcrypt = require("bcrypt");
const { userModel } = require("../models/user.model");
const userRouter = express.Router();

const salt = bcrypt.genSaltSync(5);

userRouter.post("/register", async function (req, res) {
  const { username, password } = req.body;
  //   console.log(registeruser);
  try {
    const user = await userModel.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.status(200).json({ msg: "Register Success", user: user });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

userRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userModel.findOne({ username });
    const passok = bcrypt.compare(password, user.password);
    if (passok) {
      res.status(200).json({ msg: "Login Success" });
    } else {
      res.status(200).json({ msg: "wrong password" });
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

module.exports = {
  userRouter,
};
