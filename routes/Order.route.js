const express = require("express");
const router = express.Router();

const {
  addOrder,
  getOrders,
  getOrder,
  updateOrder,
  removeOrder,
} = require("../controllers/Order.controller");

router.post("/", addOrder);

router.get("/", getOrders);

router.get("/:id", getOrder);

router.put("/:id", updateOrder);

router.delete("/:id", removeOrder);

module.exports = router;
