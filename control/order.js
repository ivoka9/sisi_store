const express = require("express");
const db = require("../models");
const states = require("../public/scripts/allStates");
const router = express.Router();

/* POST Order */

router.get("/:id", (req, res) => {
  res.render("orderCreate", { states: states, id: req.params.id });
});

router.post("/:id", async (req, res) => {
  try {
    const item = await db.Item.findById(req.params.id);
    const order = {
      state: req.body.state,
      zip: req.body.zip,
      street: req.body.address + " " + req.body.address2,
      nameOfBuyer: req.body.first + " " + req.body.last,
      phone : req.body.phone,
      items: [item],
      done: false
    };

    const newOrder = await db.Order.create(order);

    res.send("Order succesfull");
  } catch (err) {
    console.log(err);
    res.send("not succesfull");
  }
});

router.put('/done/:id' ,async(req,res)=>{
  await db.Order.findByIdAndUpdate(req.params.id,{done:true})
  res.redirect('/admin/orders')
})

module.exports = router;
