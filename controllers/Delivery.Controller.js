const Delivery = require("../models/Delivery.model");

const addDelivery = (req, res) => {
  const { site, address, date, phone, orderNo } = req.body;

  const delivery = new Delivery({
    site,
    address,
    date,
    phone,
    orderNo,
  });

  delivery
    .save()
    .then((createdDelivery) => {
      res.json(createdDelivery);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};

const getDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find();
    res.json(deliveries);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getDelivery = async (req, res) => {
  const deliveryId = req.params.id;

  try {
    const delivery = await Delivery.findById(deliveryId);
    res.json(delivery);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  addDelivery,
  getDeliveries,
  getDelivery,
};
