const express = require("express");
const router = express.Router();

const {
  addDelivery,
  getDeliveries,
  getDelivery,
} = require("../controllers/Delivery.controller");

router.post("/", addDelivery);

router.get("/", getDeliveries);

router.get("/:id", getDelivery);

module.exports = router;
