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
    phone: Number,
    street: String,
    nameOfBuyer: String,
    done: Boolean
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
