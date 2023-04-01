const express = require("express");
const app = express();
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const { insertSecret, getSecretByHash } = require("./model/Secret.model");
const { encrypt } = require("./utils/encryptionHandlers");
// const swaggerDocument = YAML.load("../swagger.yaml");

//handle cors errors
app.use(cors());
//serving swagger
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
    const { secretText, expireAfter } = req.body;
    const hashText = encrypt(secretText);
    const secretObj = {
      secretText: hashText.text,
      iv: hashText.iv,
      expireAfter,
    };
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

app.get("/", (req, res) => {
  res.json({"message": "healthy connection"})
})

// //step 1
// app.use(express.static(path.resolve(__dirname, "./client/build")));
// // Step 2:
// app.get("*", function (request, response) {
//   response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
// });

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
