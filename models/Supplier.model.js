const mongoose = require("mongoose");
const { Schema } = mongoose;

const supplierSchema = new Schema({
  name: String,
  address: String,
  phone: String,
  email: String,
  password: String,
});

module.exports = Staff = mongoose.model("Supplier", supplierSchema);
