const express = require("express");
const router = express.Router();
const db = require("../models");
const multer = require("multer");
const upload = multer({ dest: "upload" });


router.get("/", async (req, res) => {
  const allItems = await db.Item.find({});
  const flag = await db.Order.findOne({done:false})
 
  res.render("adminMain", { allItems: allItems, flag:flag==null });
});

router.get("/add", (req, res) => {
  res.render("adminCreate");
});

router.post("/item/new", upload.array("img"), async (req, res) => {
  const arr = req.files.map((img) => img.filename);
  res.json(req.files)
  const newItem = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    img: arr,
  };
  await db.Item.create(newItem);
  res.redirect("/admin");
});

router.put("/item/edit/:id", async (req, res) => {
  const editItem = {
    name: "item2",
    price: 123,
    img: "NULL",
  };
  const id = "5f7b6fff75f5f61dc8c71b0c";
  await db.Item.findByIdAndUpdate(id, editItem);
  res.send("item" + id + " changed");
});

router.delete("/item/delete/:id", async (req, res) => {
  await db.Item.findByIdAndDelete(req.params.id);
  res.json({deleted:true});
});

router.get('/orders', async(req,res)=>{
  const orders = await db.Order.find({})
  res.render('adminOrders',{orders:orders})
})

router.get('/order/:id',async(req,res)=>{
  const order = await db.Order.findById(req.params.id).populate('items')
  console.log(order)
  res.render('orderDetails',{order:order})
})

router.get("/:id", async (req, res) => {
  const showItem = await db.Item.findById(req.params.id);
  res.send("item " + showItem + " Id found");
});

module.exports = router;
