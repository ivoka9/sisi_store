const express = require("express");
const control = require("./control");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const cors = require('cors')

require("dotenv").config();

const PORT = process.env.PORT || 4000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/upload"));

app.use("/order", control.order);
app.use("/admin", control.admin);
app.use('/user',control.user)
app.use("/", control.store);

app.listen(PORT, () => {
  console.log("server Online");
});
