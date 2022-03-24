const express = require("express");
const router = express.Router();


const {getOrders, getOrder, updateOrder, deleteOrder, addOrder} = require("../controllers/ordersController");
const {orderValidationRules} = require("../validation/orderRules")

router
  .route("/")
  .get(getOrders)
  .post(orderValidationRules, addOrder);

router
  .route("/:id")
  .get(getOrder)
  .delete(deleteOrder)
  .put(orderValidationRules, updateOrder);

module.exports = router;