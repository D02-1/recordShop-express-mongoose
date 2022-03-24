const express = require("express");
const router = express.Router();
const multer = require('multer');

const {getRecords, getRecord, deleteRecord, addRecord} = require("../controllers/recordsController");
const {recordValidationPostRules} = require("../validation/recordRules")

const upload = multer({
  limits:
  {
      fileSize: 500000
  }
});

router
  .route("/")
  .get(getRecords)
  .post(upload.single("cover"), recordValidationPostRules, addRecord);

router
  .route("/:id")
  .get(getRecord)
  .delete(deleteRecord)

module.exports = router;