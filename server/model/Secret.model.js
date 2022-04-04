const { SecretSchema } = require("./Secret.schema");

//creating a secret
const insertSecret = (secretObj) => {
  return new Promise((resolve, reject) => {
    try {
      SecretSchema(secretObj)
        .save()
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

//getting a single secret
const getSecretByHash = (hash) => {
  return new Promise((resolve, reject) => {
    try {
      SecretSchema.find({ hash })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  insertSecret,
  getSecretByHash,
};
