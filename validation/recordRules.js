const { body } = require("express-validator");


const recordValidationPostRules = [
  body("title")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("Title must not be empty."),
  body("artist")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("Please enter an artist."),
  body("price")
    .not()
    .isEmpty()
    .withMessage("Price must not be empty.")
    .isCurrency()
    .withMessage("Please enter a valid currency format.")
    .trim()
    .escape(),
  body("year")
    .not()
    .isEmpty()
    .withMessage("Release year must not be empty.")
    .isInt({
    min: 1901,
    max: 2022
    })
    .withMessage('Please enter a valid release year.')
    .trim()
    .escape(),
  body("img")
    .custom((value, { req }) => {
      if (!req.file) throw new Error("Cover image is required");
      return true;
    }),
];


const recordValidationPutRules = [
  body("title")
    .not()
    .isEmpty()
    .optional()
    .trim()
    .escape()
    .withMessage("Please enter a title."),
  body("artist")
    .not()
    .isEmpty()
    .optional()
    .trim()
    .escape()
    .withMessage("Please enter an artist."),
  body("price")
    .not()
    .isEmpty()
    .optional()
    .isCurrency()
    .withMessage("Please enter a valid currency format.")
    .trim()
    .escape(),
  body("year")
  .not()
  .isEmpty()
  .optional()
  .isInt({
  min: 1901,
  max: 1930
  })
  .withMessage('Please enter a valid release year.')
  .trim()
  .escape(),
  body("img")
    .optional()
    .custom((value, { req }) => {
      if (!req.file) throw new Error("Cover image is required");
      return true;
    }),
];






module.exports = { recordValidationPostRules, recordValidationPutRules}









