const Order = require("../models/Order.model");

const addOrder = (req, res) => {
  const { staffId, orderNo, site, item, itemPrice, quantity } = req.body;

  const order = new Order({
    staffId,
    orderNo,
    site,
    item,
    itemPrice,
    quantity,
  });

  order
    .save()
    .then((createdOrder) => {
      res.json(createdOrder);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getOrder = async (req, res) => {
  const orderId = req.params.id;

  try {
    const order = await Order.findById(orderId);
    res.json(order);
  } catch (error) {
    res.status(400).json(error);
  }
};

const removeOrder = async (req, res) => {
  const orderId = req.params.id;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json("There is no order to remove");
    }

    const removedOrder = await Order.findByIdAndDelete(orderId);
    res.status(200).json(removedOrder);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const updateOrder = async (req, res) => {
  const orderId = req.params.id;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json("There is no order to update");
    }

    const { staffId, orderNo, site, item, itemPrice, quantity } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(orderId, {
      staffId,
      orderNo,
      site,
      item,
      itemPrice,
      quantity,
    });

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {
  addOrder,
  getOrders,
  removeOrder,
  updateOrder,
  getOrder,
};
