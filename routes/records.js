const express = require("express");
const router = express.Router();

const {getRecords, getRecord, updateRecord, deleteRecord, addRecord} = require("../controllers/recordsController");

router
  .route("/")
  .get(getRecords)
  .post(addRecord);

router
  .route("/:id")
  .get(getRecord)
  .delete(deleteRecord)
  .put(updateRecord);

module.exports = router;