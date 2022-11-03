const express = require("express");
const router = express.Router();

const {
  addSite,
  getSite,
  getSites,
  updateSite,
  removeSite,
} = require("../controllers/Site.controller");

router.post("/", addSite);

router.get("/", getSites);

router.get("/:id", getSite);

router.put("/:id", updateSite);

router.delete("/:id", removeSite);

module.exports = router;
