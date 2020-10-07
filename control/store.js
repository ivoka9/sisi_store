const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/", async (req, res) => {
  const allItems = await db.Item.find({});
  res.render("main", { allItems: allItems });
});

router.get("/:id", async (req, res) => {
  const showItem = await db.Item.findById(req.params.id);
  res.render("itemShow", { showItem: showItem });
});

module.exports = router;
