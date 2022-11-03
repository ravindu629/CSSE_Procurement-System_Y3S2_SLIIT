const Site = require("../models/Site.model");

const addSite = (req, res) => {
  const { name, budget, startDate, endDate } = req.body;

  const site = new Site({
    name,
    budget,
    startDate,
    endDate,
  });

  site
    .save()
    .then((createdSite) => {
      res.json(createdSite);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};

const getSites = async (req, res) => {
  try {
    const sites = await Site.find();
    res.json(sites);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getSite = async (req, res) => {
  const siteId = req.params.id;

  try {
    const site = await Site.findById(siteId);
    res.json(site);
  } catch (error) {
    res.status(400).json(error);
  }
};

const removeSite = async (req, res) => {
  const siteId = req.params.id;

  try {
    const site = await Site.findById(siteId);

    if (!site) {
      return res.status(404).json("There is no site to remove");
    }

    const removedSite = await Site.findByIdAndDelete(siteId);
    res.status(200).json(removedSite);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const updateSite = async (req, res) => {
  const siteId = req.params.id;

  try {
    const st = await Site.findById(siteId);

    if (!st) {
      return res.status(404).json("There is no site to update");
    }

    const { name, budget, startDate, endDate } = req.body;

    const updatedSite = await Site.findByIdAndUpdate(siteId, {
      name,
      budget,
      startDate,
      endDate,
    });

    res.status(200).json(updatedSite);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {
  addSite,
  getSite,
  getSites,
  updateSite,
  removeSite,
};
