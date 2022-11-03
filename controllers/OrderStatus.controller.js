const OrderStatus = require("../models/OrderStatus.model");

const addOrderStatus = (req, res) => {
  const { staffId, orderNo, site, total, status } = req.body;

  const orderSts = new OrderStatus({
    staffId,
    orderNo,
    site,
    total,
    status,
  });

  orderSts
    .save()
    .then((createdOrderSts) => {
      res.json(createdOrderSts);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};

const getOrdersStatus = async (req, res) => {
  try {
    const ordersStatus = await OrderStatus.find();
    res.json(ordersStatus);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getOrderStatus = async (req, res) => {
  const orderStatusId = req.params.id;

  try {
    const orderStatus = await OrderStatus.findById(orderStatusId);
    res.json(orderStatus);
  } catch (error) {
    res.status(400).json(error);
  }
};

const updateOrderStatus = async (req, res) => {
  const orderStatusId = req.params.id;

  try {
    const orderStatus = await OrderStatus.findById(orderStatusId);

    if (!orderStatus) {
      return res.status(404).json("There is no order to update");
    }

    const { staffId, orderNo, site, total, status } = req.body;

    const updatedOrderStatus = await OrderStatus.findByIdAndUpdate(
      orderStatusId,
      {
        staffId,
        orderNo,
        site,
        total,
        status,
      }
    );

    res.status(200).json(updatedOrderStatus);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const removeOrderStatus = async (req, res) => {
  const orderStatusId = req.params.id;

  try {
    const orderSts = await OrderStatus.findById(orderStatusId);

    if (!orderSts) {
      return res.status(404).json("There is no order status to remove");
    }

    const removedOrderSts = await OrderStatus.findByIdAndDelete(orderStatusId);
    res.status(200).json(removedOrderSts);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {
  addOrderStatus,
  getOrderStatus,
  getOrdersStatus,
  updateOrderStatus,
  removeOrderStatus,
};
