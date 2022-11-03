const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;
const uri = process.env.MONGO_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once("open", () => {
  console.log("MongoDB Connected");
});

app.get("/", (req, res) => {
  res.send("Api running");
});

app.use("/api/orders", require("./routes/Order.route"));
app.use("/api/staffMembers", require("./routes/Staff.route"));
app.use("/api/orderStatus", require("./routes/OrderStatus.route"));
app.use("/api/sites", require("./routes/Site.route"));
app.use("/api/suppliers", require("./routes/Supplier.route"));
app.use("/api/deliveries", require("./routes/Delivery.route"));

app.listen(port, () => {
  console.log("Server is starting on port " + port);
});
