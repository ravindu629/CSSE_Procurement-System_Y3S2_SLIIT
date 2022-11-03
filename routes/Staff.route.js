const express = require("express");
const router = express.Router();

const {
  addStaffMember,
  validateStaffMember,
  getStaffMember,
  getStaffMembers,
  updateStaffMember,
  removeStaffMember,
} = require("../controllers/Staff.controller");

router.post("/", addStaffMember);

router.get("/", getStaffMembers);

router.get("/:id", getStaffMember);

router.put("/:id", updateStaffMember);

router.delete("/:id", removeStaffMember);

router.post("/validate", validateStaffMember);

module.exports = router;
