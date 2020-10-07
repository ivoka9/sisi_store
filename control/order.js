const express = require("express");
const db = require("../models");
const states = require("../public/scripts/allStates");
const router = express.Router();

/* POST Order */

router.get("/", (req, res) => {
  res.render("orderCreate", { states: states });
});

router.post("/", async (req, res) => {
  const item = await db.Item.findById("5f7b6fff75f5f61dc8c71b0c");
  const order = {
    state: "MA",
    zip: 123,
    street: "ivo str",
    nameOfBuyer: "ivoka",
    items: [item],
  };
  const newOrder = await db.Order.create(order);
  console.log(order);
  res.send("Order created");
});

module.exports = router;
