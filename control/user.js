const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const jws = require("jsonwebtoken");
const TokenProtection = require("../customMiddleWere/tokenProtection");
const bcrypt = require("bcrypt");
const db = require("../models");

router.post("/create", async (req, res) => {
  try {
    const password = await bcrypt.hash(req.body.password, 10);
    await db.User.create({
      username: req.body.username,
      password: password,
      isAdmin: false,
    });
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.post("/login", upload.none(), async (req, res) => {
  try {
    console.log(req.body);
    const user = await db.User.findOne({ username: req.body.username });
    if (bcrypt.compare(req.body.password, user.password)) {
      const token = jws.sign(
        { user: user.username, isAdmin: user.isAdmin },
        process.env.TOKEN_SICRET_KEY,
        { expiresIn: "1h" }
      );
      res.json({ token: token, username: user.username });
    } else {
      res.sendStatus(401).send("wrong username or password");
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(401).send("wrong username or password");
  }
});

router.post("/test", TokenProtection.tokenProtection, (req, res) => {
  res.send("working");
});

module.exports = router;
