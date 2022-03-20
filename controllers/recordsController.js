const Record = require("../models/Record");



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
    res.status(200).send(record);
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

const updateRecord = async (req, res, next) => {
  try {
    const record = await Record.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!record) throw new Error("not found");
    res.status(200).send(record);
  } catch (err) {
    next(err);
  }
};

const addRecord = async (req, res, next) => {
  console.log(req.body);
  try {
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

module.exports = { getRecords, getRecord, deleteRecord, updateRecord, addRecord }


