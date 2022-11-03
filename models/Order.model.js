const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  staffId: String,
  orderNo: String,
  site: String,
  item: String,
  itemPrice: String,
  quantity: String,
});

module.exports = Order = mongoose.model("Order", orderSchema);
