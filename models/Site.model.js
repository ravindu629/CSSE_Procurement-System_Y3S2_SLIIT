const mongoose = require("mongoose");
const { Schema } = mongoose;

const siteSchema = new Schema({
  name: String,
  budget: String,
  startDate: String,
  endDate: String,
});

module.exports = Site = mongoose.model("Site", siteSchema);
