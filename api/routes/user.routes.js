const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretkey = "kuyfk654jhfb";
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
    if (user) {
      const passok = await bcrypt.compare(password, user.password);
      // console.log(passok);
      if (passok) {
        jwt.sign({ username, id: user._id }, secretkey, {}, (err, token) => {
          if (err) throw err;
          // res.status(200).json({ msg: "Login Success", token: token });
          res.cookie("token", token).json("ok");
        });
      } else {
        res.status(200).json({ msg: "wrong password" });
      }
    } else {
      res.status(403).json({ msg: "user not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = {
  userRouter,
};
