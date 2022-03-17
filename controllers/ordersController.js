const Order = require("../models/Order");


const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
};

const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) throw new Error("not found");
    res.status(200).send(order);
  } catch (err) {
    next(err);
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) throw new Error("not found");
    res.status(200).send(order);
  } catch (err) {
    next(err);
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!order) throw new Error("not found");
    res.status(200).send(order);
  } catch (err) {
    next(err);
  }
};

const addOrder = async (req, res, next) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(200).send(order);
  } catch (err) {
    next(err);
  }
};

module.exports ={getOrders, getOrder, deleteOrder, updateOrder, addOrder}