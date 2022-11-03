const mongoose = require("mongoose");
const { Schema } = mongoose;

const staffSchema = new Schema({
  fName: String,
  lName: String,
  staffId: String,
  type: String,
  email: String,
  phoneNumber: String,
  password: String,
});

module.exports = Staff = mongoose.model("Staff", staffSchema);
