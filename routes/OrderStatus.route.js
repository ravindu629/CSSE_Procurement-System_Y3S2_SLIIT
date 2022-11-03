const express = require("express");
const router = express.Router();

const {
  addOrderStatus,
  getOrderStatus,
  getOrdersStatus,
  updateOrderStatus,
  removeOrderStatus,
} = require("../controllers/OrderStatus.controller");

router.post("/", addOrderStatus);

router.get("/", getOrdersStatus);

router.get("/:id", getOrderStatus);

router.put("/:id", updateOrderStatus);

router.delete("/:id", removeOrderStatus);

module.exports = router;
