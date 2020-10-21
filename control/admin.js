const express = require("express");
const router = express.Router();
const db = require("../models");
const multer = require("multer");
const upload = multer();


router.get("/", async (req, res) => {
  const allItems = await db.Item.find({});
  const flag = await db.Order.findOne({done:false})
 
  res.render("adminMain", { allItems: allItems, flag:flag==null });
});


router.post("/item/new", upload.none(), async (req, res) => {
  try{
  const newItem = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    img: req.body.img.split(','),
  };
  const created = await db.Item.create(newItem);
  res.json("Post Crated");
  }catch(err){
    console.log(err)
    res.json('ERR')
  }
});


router.delete("/item/delete/:id", async (req, res) => {
  await db.Item.findByIdAndDelete(req.params.id);
  res.json({deleted:true});
});

router.get('/orders', async(req,res)=>{
  const orders = await db.Order.find({})
  res.json({orders:orders})
})

router.get('/order/:id',async(req,res)=>{
  const order = await db.Order.findById(req.params.id).populate('items')
  res.json({order:order})
})

router.get("/:id", async (req, res) => {
  const showItem = await db.Item.findById(req.params.id);
  res.send("item " + showItem + " Id found");
});

module.exports = router;
