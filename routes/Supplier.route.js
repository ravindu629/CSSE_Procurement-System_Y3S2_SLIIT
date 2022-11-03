const express = require("express");
const router = express.Router();

const {
  addSupplier,
  validateSupplier,
  getSuppliers,
  getSupplier,
  updateSupplier,
  removeSupplier,
} = require("../controllers/Supplier.controller");

router.post("/", addSupplier);

router.get("/", getSuppliers);

router.get("/:id", getSupplier);

router.put("/:id", updateSupplier);

router.delete("/:id", removeSupplier);

router.post("/validate", validateSupplier);

module.exports = router;
