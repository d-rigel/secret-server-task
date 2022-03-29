const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

//handle cors errors
app.use(cors());

//inporting mongodb
const connectDB = require("./config/db");

connectDB();

//Logger
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("<h4>Hello Nnadozie</h4>");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
