const Order = require("../models/Order");


const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.status(200).send(orders);
  } catch (e) {
    next(e);
  }
};

const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) throw new Error("not found");
    res.status(200).send(order);
  } catch (e) {
    next(e);
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) throw new Error("not found");
    res.status(200).send(order);
  } catch (e) {
    next(e);
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!order) throw new Error("not found");
    res.status(200).send(order);
  } catch (e) {
    next(e);
  }
};

const addOrder = async (req, res, next) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(200).send(order);
  } catch (e) {
    next(e);
  }
};

module.exports ={getOrders, getOrder, deleteOrder, updateOrder, addOrder}