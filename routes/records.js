const express = require("express");
const router = express.Router();
const multer = require('multer');

const {getRecords, getRecord, updateRecord, deleteRecord, addRecord} = require("../controllers/recordsController");

const upload = multer({
  limits:
  {
      fileSize: 500000
  }
});

router
  .route("/")
  .get(getRecords)
  .post( upload.single("cover"),addRecord);

router
  .route("/:id")
  .get(getRecord)
  .delete(deleteRecord)
  .put(updateRecord);

module.exports = router;