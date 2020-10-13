const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/", async (req, res) => {
  const allItems = await db.Item.find({});
  res.json({ allItems: allItems });
});

router.get("/:id", async (req, res) => {
  const showItem = await db.Item.findById(req.params.id);
  res.json( { showItem: showItem });
});

module.exports = router;
