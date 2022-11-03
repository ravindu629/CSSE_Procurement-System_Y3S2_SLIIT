const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderStatusSchema = new Schema({
  staffId: String,
  orderNo: String,
  site: String,
  total: String,
  status: String,
});

module.exports = OrderStatus = mongoose.model("OrderStatus", orderStatusSchema);
