require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");
const { corsOptions } = require("./src/config/corsOptions");
const { credentials } = require("./src/middleware/credentials");

const { errorHandler } = require("./src/middleware/errorHandler");

const mongoose = require("mongoose");

const { connectDB } = require("./src/config/dbConn");

const PORT = process.env.PORT || 3500;

// Connection to DB
connectDB();

//Handle options credentials check - before CORDS!!!
app.use(credentials);

// CORS
app.use(cors(corsOptions));

// built-in middleware for json
app.use(express.json());

// Routes
app.use("/", require("./src/routes/root"));
app.use("/register", require("./src/routes/register"));
app.use("/grupos", require("./src/routes/api/grupo"));

// Error handler
app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("connected to mongoDB!");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
