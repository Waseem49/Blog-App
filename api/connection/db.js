const mongoose = require("mongoose");

const connection = mongoose.connect(
  "mongodb+srv://mdwaseem:mdwaseem@cluster0.tdsn7wd.mongodb.net/blog-app-mern"
);

module.exports = {
  connection,
};
