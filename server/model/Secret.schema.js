const mongoose = require("mongoose");
const Int32 = require("mongoose-int32").loadType(mongoose);
const Schema = mongoose.Schema;
var Hashids = require("hashids/cjs");

const SecretSchema = new Schema({
  hashId: {
    type: String,
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

SecretSchema.pre("save", function (next) {
  if (!this.hashId)
    this.hashId = new Hashids("this is my salt").encode("hashId");

  next();
});

// var SecretSchema = new Schema(
//   {
//     secret: {
//       type: String,
//       required: true,
//       maxlength: 200,
//     },
//     expireAfter: {
//       type: Int32,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// var SecretSchema = new Schema(
//   {
//     expireAfter: {
//       type: Date,
//       expires: "15s",
//       default: Date.now,
//     },
//     secret: {
//       type: String,
//       required: true,
//       maxlength: 200,
//     },
//     expireAfter: {
//       type: Int32,
//       required: true,
//     },
//   },
//   { timestamps: { createdAt: "created_at" } }
// );
// const createStreamKey = function (next) {
//   let user = this;
//   if (!user.isNew("key_hash")) {
//     return next();
//   }
//   const id = crypto.randomBytes(20).toString("hex");
//   user.key_hash = `sinuous_${id}`;
//   next();
// };
// SecretSchema.pre("save", createStreamKey);

module.exports = {
  SecretSchema: mongoose.model("Secret", SecretSchema),
};
