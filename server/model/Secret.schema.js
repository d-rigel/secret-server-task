const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { nanoid } = require("nanoid");

const SecretSchema = new Schema({
  hash: {
    type: String,
    required: true,
    default: () => nanoid(7),
    index: { unique: true },
  },
  expireAfter: {
    type: Date,
    required: true,
    expires: 0,
  },
  secretText: {
    type: String,
    required: true,
    maxlength: 200,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

module.exports = {
  SecretSchema: mongoose.model("Secret", SecretSchema),
};
