const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const { insertSecret } = require("./model/Secret.model");
const { encrypt, decrypt } = require("./utils/encryptionHandlers");

//handle cors errors
app.use(cors());

//inporting mongodb
const connectDB = require("./config/db");

connectDB();

//Logger
app.use(morgan("tiny"));

//Set body bodyParser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/v1/secret", async (req, res) => {
  try {
    const { secret } = req.body;
    const hashText = encrypt(secret);
    const secretObj = { secret: hashText.text, iv: hashText.iv };
    const result = await insertSecret(secretObj);
    if (result) {
      return res.json({
        status: "success",
        message: "new secret created and will expire in 60 seconds",
      });
    }
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
