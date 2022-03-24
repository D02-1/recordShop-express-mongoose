const mongoose = require('mongoose');
const { body } = require("express-validator");

const orderValidationRules = [
    body("quantity")
        .not()
        .isEmpty()
        .isInt({
            min: 1,
        })
        .withMessage("Please enter minimum one as a quantity"),
    body("record")
        .not()
        .isEmpty()
        .withMessage("Please choose a record for your order."),
];



module.exports = { orderValidationRules }


