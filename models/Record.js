const mongoose = require("mongoose");
const { Schema } = mongoose;


const imageSchema = new Schema({
    name: String,
    data: Buffer,
    contentType: String,
},{ _id : false })


const recordSchema = new Schema({
    title:String,
    artist:String,
    year:Number,
    img: imageSchema,
    price:Number
}, { timestamps: true });

module.exports = mongoose.model("Record", recordSchema, "records");



