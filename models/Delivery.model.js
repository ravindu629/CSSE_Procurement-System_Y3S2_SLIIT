const mongoose = require("mongoose");
const { Schema } = mongoose;

const deliverySchema = new Schema({
  address: String,
  date: String,
  phone: String,
  site: String,
  orderNo: String,
});

module.exports = Delivery = mongoose.model("Delivery", deliverySchema);
