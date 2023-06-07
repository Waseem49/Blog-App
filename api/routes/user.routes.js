const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const uploadmiddleware = multer({ dest: "uploads/" });
const fs = require("fs");
const secretkey = "kuyfk654jhfb";
const { userModel } = require("../models/user.model");
const { postModel } = require("../models/post.model");
const path = require("path");
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
          res.cookie("token", token).json({ id: user._id, username });
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

userRouter.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secretkey, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
  res.json(req.cookies);
});

userRouter.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

userRouter.post("/post", uploadmiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newpath = path + "." + ext;
  fs.renameSync(path, newpath);

  const { token } = req.cookies;
  jwt.verify(token, secretkey, {}, async (err, info) => {
    console.log(info);
    if (err) throw err;
    const { title, summary, content } = req.body;
    const postdoc = await postModel.create({
      title,
      summary,
      content,
      cover: newpath,
      author: info.username,
    });
    res.json(postdoc);
  });
});

userRouter.get("/post", async (req, res) => {
  res.json(await postModel.find().sort({ createdAt: -1 }).limit(20));
});

userRouter.patch("/post", uploadmiddleware.single("file"), async (req, res) => {
  let newpath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newpath = path + "." + ext;
    fs.renameSync(path, newpath);
  }
  const { token } = req.cookies;
  jwt.verify(token, secretkey, {}, async (err, info) => {
    console.log(info);
    // if (err) throw err;
    const { id, title, summary, content } = req.body;
    // console.log(id, title, summary, content);
    // const postdoc = await postModel.findById(id);
    // if (postdoc.author === info.username) {
    //   const final = await postModel.findOneAndUpdate(
    //     id,
    //     { title, summary, content, cover: newpath ? newpath : postdoc.cover },
    //     { new: true }
    //   );
    // await postdoc.update({
    //   title,
    //   summary,
    //   content,
    //   cover: newpath ? newpath : postdoc.cover,
    // });
    // }
    // res.json(final);
    try {
      const updated = await postModel.findByIdAndUpdate(
        { _id: id },
        { title: title, summary: summary, content: content, cover: newpath }
      );
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
    // const updated = await postModel.findByIdAndUpdate(
    //   { _id: id },
    //   { title: title, summary: summary, content: content, cover: newpath }
    // );
    // res.json(updated);
  });
});

userRouter.get("/post/:id", async (req, res) => {
  const { id } = req.params;

  res.json(await postModel.find({ _id: id }));
});

module.exports = {
  userRouter,
};
