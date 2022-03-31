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
    expires: "60s",
    default: Date.now,
  },
  secret: {
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
