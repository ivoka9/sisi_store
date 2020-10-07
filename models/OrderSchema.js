const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
      },
    ],
    state: String,
    zip: Number,
    street: String,
    nameOfBuyer: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
