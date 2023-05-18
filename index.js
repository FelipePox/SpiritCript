require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const { connectDB } = require("./src/config/dbConn");

const PORT = process.env.PORT || 3500;

//Connection to DB
connectDB();

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());


//Routes
app.use('/', require('./src/routes/root'))


mongoose.connection.once("open", () => {
  console.log("connected to mongoDB!");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
