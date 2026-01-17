const crypto = require("crypto");
const bcrypt = require("bcrypt");

// Function to generate the API Key
export const generateApiKey = () => {
  return `sk_${crypto.randomBytes(24).toString("hex")}`;
};

// Function to hash the API Key
export const hashApiKey = (apiKey) => {
  bcrypt.hash(apiKey, process.env.SALT_ROUNDS);
};

// Function to verify the API Key
export const compareApiKey = (apiKey, hash) => {
  bcrypt.compare(apiKey, hash);
};
