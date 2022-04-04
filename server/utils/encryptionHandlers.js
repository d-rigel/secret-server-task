const crypto = require("crypto");
const secret = "pppppppppppppppppppppppppppppppp";

//encryption function
const encrypt = (text) => {
  const iv = Buffer.from(crypto.randomBytes(16));
  const cipher = crypto.createCipheriv("aes-256-ctr", Buffer.from(secret), iv);

  const encryptedText = Buffer.concat([cipher.update(text), cipher.final()]);

  return {
    iv: iv.toString("hex"),
    text: encryptedText.toString("hex"),
  };
};

// function to decrypt secret // to be used if i want to decrypt the secret and i need another endpoint for it
const decrypt = (encryption) => {
  const decipher = crypto.createCipheriv(
    "aes-256-ctr",
    Buffer.from(secret),
    Buffer.from(encryption.iv, "hex")
  );

  const decryptedText = Buffer.concat([
    decipher.update(Buffer.from(encryption.text, "hex")),
    decipher.final(),
  ]);

  return decryptedText.toString();
};

module.exports = { encrypt };
