const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const {
  insertSecret,
  getSecretByHash,
  getSecretAllSecrets,
} = require("./model/Secret.model");
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

//api to add a secret
app.post("/v1/secret", async (req, res) => {
  try {
    const { secret } = req.body;
    const hashText = encrypt(secret);
    const secretObj = { secret: hashText.text, iv: hashText.iv };
    const result = await insertSecret(secretObj);
    if (result) {
      return res.json({
        result,
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

//api to get a single secret
app.get(`/v1/secret/:hash`, async (req, res) => {
  try {
    const { hash } = req.params;
    const result = await getSecretByHash(hash);
    console.log(result);
    return res.json({
      status: "success",
      result,
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

//api to get all secrets:  NB: not in the guideline documentation
app.get("/v1/showSecrets", async (req, res) => {
  try {
    const result = await getSecretAllSecrets();
    return res.json({
      status: "success",
      result,
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
