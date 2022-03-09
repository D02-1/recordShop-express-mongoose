const Record = require("../models/Record");


const getRecords = async (req, res, next) => {
  try {
    const records = await Record.find();
    res.status(200).send(records);
  } catch (e) {
    next(e);
  }
};

const getRecord = async (req, res, next) => {
  try {
    const record = await Record.findById(req.params.id);
    if (!record) throw new Error("not found");
    res.status(200).send(record);
  } catch (e) {
    next(e);
  }
};

const deleteRecord = async (req, res, next) => {
  try {
    const record = await Record.findByIdAndDelete(req.params.id);
    if (!record) throw new Error("not found");
    res.status(200).send(record);
  } catch (e) {
    next(e);
  }
};

const updateRecord = async (req, res, next) => {
  try {
    const record = await Record.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!record) throw new Error("not found");
    res.status(200).send(record);
  } catch (e) {
    next(e);
  }
};

const addRecord = async (req, res, next) => {
  try {
    const record = new Record(req.body);
    await record.save();
    res.status(200).send(record);
  } catch (e) {
    next(e);
  }
};

module.exports ={getRecords, getRecord, deleteRecord, updateRecord, addRecord}