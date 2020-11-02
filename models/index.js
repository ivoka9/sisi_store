const mongoose = require("mongoose");
require("dotenv").config();
const url = process.env.MONGO_URL;

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Data Base Connected");
  })
  .catch((err) => {
    console.log("err");
  });

module.exports = {
  Item: require("./ItemSchema"),
  Order: require("./OrderSchema"),
  User: require('./UserSchema')
};
