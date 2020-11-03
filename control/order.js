const express = require("express");
const db = require("../models");
const states = require("../public/scripts/allStates");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const auth = require(".././customMiddleWere/tokenProtection");

/* POST Order */

router.get("/:id", (req, res) => {
  res.json({ states: states, id: req.params.id });
});

router.post("/:id", upload.none(), async (req, res) => {
  try {
    const item = await db.Item.findById(req.params.id);
    const order = {
      state: req.body.state,
      zip: req.body.zip,
      street: req.body.address + " " + req.body.address2,
      nameOfBuyer: req.body.first + " " + req.body.last,
      phone: req.body.phone,
      items: [item],
      done: false,
    };

    const newOrder = await db.Order.create(order);

    res.json({ order: true });
  } catch (err) {
    console.log(err);
    res.json({ order: false });
  }
});

router.put(
  "/done/:id",
  upload.none(),
  auth.tokenProtection,
  async (req, res) => {
    await db.Order.findByIdAndUpdate(req.params.id, { done: true });
    res.json({ done: true });
  }
);

module.exports = router;
