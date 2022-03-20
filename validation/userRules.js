const { body } = require("express-validator");

// overview of all methods validator.js
// https://www.npmjs.com/package/validator

// body updates the req object, putting the validation results into it,
// which we check in the controller - const errors = validationResult(req)
// escape() will replace certain characters (i.e. <, >, /, &, ', ") with the corresponding HTML entity
// normalizeEmail() ensures the email address is in a safe and standard format.


// https://express-validator.github.io/docs/validation-chain-api.html
const userValidationPostRules = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please enter a valid email..."),
  body("password")
    .isLength({ min: 5})
    .withMessage("Minimum password length is 5"),
  body("firstName")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("Please enter your first name."),
  body('confirmPassword', 'Passwords do not match').custom((value, {req}) => (value === req.body.password)),
];


const userValidationPutRules = [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email...")
      .optional()
      .trim()
      .normalizeEmail(),
    body("password")
      .not()
      .isEmpty()
      .optional()
      .isLength({ min: 5})
      .withMessage("Minimum password length is 5"),
    body("firstName")
      .not()
      .isEmpty()
      .optional()
      .withMessage('Pls enter your firstname.')
      .trim()
      .escape(),
];
  
module.exports ={userValidationPostRules , userValidationPutRules}

