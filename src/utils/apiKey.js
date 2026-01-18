const crypto = require("crypto");
const bcrypt = require("bcrypt");

// Generate a new raw API key
exports.generateApiKey = () => {
  return `sk_${crypto.randomBytes(24).toString("hex")}`;
};

// Hash a raw API key
exports.hashApiKey = async (apiKey) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(apiKey, salt);
};

// Compare raw API key with stored hash
exports.compareApiKey = async (apiKey, hash) => {
  if (!apiKey || !hash) throw new Error("API key or hash missing");
  return bcrypt.compare(apiKey, hash);
};
