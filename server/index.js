const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use("/", require("./routes/authRouter"));

mongoose
    .connect(process.env.MONGODB_URL)

    .then(() => {
        console.log("Database Connected");
    })
    .catch((e) => {
        console.log(e.message, "Not Connected Database");
    });

const port = 8000|| process.env.PORT
app.listen(port , (e) => {
    if (e) throw e.message
});
