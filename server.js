/** EXTERNAL DEPENDENCIES */
require('dotenv').config();
const express = require('express');
const path = require("path");
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const multer = require('multer');



/** IMPORTS */
const usersRouter = require("./routes/users");
const recordsRouter = require("./routes/records");
const ordersRouter = require("./routes/orders");
const { setCors } = require("./middleware/cors");
const { requestLogger } = require("./middleware/reqLogger.js")
const Record = require("./models/Record");


/** VARIABLES */
const port = process.env.PORT || 8000
const app = express();


/**CONNECT TO DB */
const db = mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`)
    .then(() => console.log("connected to db"))
    .catch((err) => console.log("something went wrong", err.reason))


/** REQUEST PARSERS */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(setCors);
app.use(requestLogger)


/** STATIC FILES*/
app.use(express.static(path.join(__dirname, "public")));


/** ROUTES */
app.use("/users", usersRouter);
app.use("/records", recordsRouter);
app.use("/orders", ordersRouter);

app.get('/images', async (req, res, next) =>
{
    try{ 
    // const coverImg = await Record.findOne({_id: "622f8f7244f38a1c5a126f00"})
    const coverImg = await Record.findOne({_id: "622f8f7244f38a1c5a126f00"})
    console.log("here we go", coverImg);
    const coverImgBob = coverImg.img
    console.log("Bob", coverImgBob.contentType);
    if(!coverImg) throw new Error("no img found")
            // wenn das bild gefunden wurde, übergeben wir einen status 200:
            res.status(200).contentType(coverImgBob.contentType).send(coverImgBob.data);
    }catch(err){
        next(err)
    }
});



/** ERROR HANDLING */
app.use((req, res, next) => {
    const error = new Error("Looks like something broke...");
    error.statusCode = 404;
    next(error);
});

app.use((err, req, res, next) => {

    res.status(err.statusCode || 500).send({
        error: {
            message: err.message
        }
    });

});


/** LISTENER */
app.listen(port, () => {
    console.log(`server is listenig on ${port} ...🐒`)
})

