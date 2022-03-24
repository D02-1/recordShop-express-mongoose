const Record = require("../models/Record");
const { validationResult } = require("express-validator");


const getRecords = async (req, res, next) => {
  try {
    const records = await Record.find();
    res.status(200).send(records);
  } catch (err) {
    next(err);
  }
};

const getRecord = async (req, res, next) => {
  try {
    const record = await Record.findById(req.params.id);
    console.log(record.img);
    if (!record) throw new Error("not found");
    res.status(200).send(record)
  } catch (err) {
    next(err);
  }
};

const deleteRecord = async (req, res, next) => {
  try {
    const record = await Record.findByIdAndDelete(req.params.id);
    if (!record) throw new Error("not found");
    res.status(200).send(record);
  } catch (err) {
    next(err);
  }
};


const addRecord = async (req, res, next) => {
  console.log(req.body);
  try {
    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { buffer, originalname, mimetype } = req.file
    const record = new Record(req.body);
    record.img = {
      data: buffer,
      name: Date.now() + "-" + originalname,
      contentType: mimetype,
    }
    const savedRecord = await record.save();
    res.status(200).send(record);
  } catch (err) {
    next(err);
  }
};

module.exports = { getRecords, getRecord, deleteRecord, addRecord }


