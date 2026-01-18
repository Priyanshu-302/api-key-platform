const bcrypt = require("bcrypt");

// Will be used for password hashing in registering for first time
exports.hashedPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

// Will be used for logging in in the server
exports.comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};
