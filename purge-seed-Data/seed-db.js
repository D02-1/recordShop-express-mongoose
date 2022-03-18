require('dotenv').config();
const Chance = require("chance")
const mongoose = require("mongoose")

const User = require("../models/User");
const Order = require("../models/Order");
const Record = require("../models/Record");

const chance = new Chance()


const db = mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`)
    .then(() => console.log("connected to db"))
    .catch((err) => console.log("something went wrong", err.reason))




const createFakeData = async () => {

try{ 
    let fakeUser = [];
    const fakeOrder = [];
    const fakeRecord = [];

    for (let i = 0; i < 20; i++) {
        const user = {
            firstName: chance.first(),
            lastName: chance.last(),
            admin: Math.random() > 0.2 ? true : false,
            email: chance.email({ domain: "example.com" }),
            password: chance.hash({ length: 15 })
        }
        fakeUser.push(user)

    await User.insertMany(user)
    
    }

    for(let i = 0; i<20; i++){
        const order = new Order({
            quantity: chance.integer({ min: 1, max: 20 }),
        })
  
        fakeOrder.push(order)
    }
    await Order.insertMany(fakeOrder)

    for(let i =0; i<20; i++){
        const record = new Record({
            title:chance.string({ length: 5 }),
            artist:chance.name({ middle: true }),
            year:chance.year({min: 1950, max: 2022}),
            img:{
                name:chance.avatar({fileExtension: 'jpg'}),
                data:chance.hash({ length: 35 }),
                contentType:"image/jpeg",
            },
            price:chance.integer({ min: 5, max: 40 })
        })
        fakeRecord.push(record)
    }
    await Record.insertMany(fakeRecord)
    }catch(err){
        console.error(err);
    }

    mongoose.connection.close();
};
createFakeData()




