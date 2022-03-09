const mongoose = require("mongoose");
const { Schema } = mongoose;

const recordSchema = new Schema({
    title: {
        type: String, 
        required: true
    },
    artist: {
        type: String, 
        required: true
    },
    year: {
        type: Number, 
        required: true
    },
    img: {
        type: String, 
        required: true
    },
    price: {
        type: Number, 
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Record", recordSchema, "records");