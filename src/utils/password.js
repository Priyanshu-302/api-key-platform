const bcrypt = require("bcrypt");

// Will be used for password hashing in registering for first time
export const hashedPassword = (password) => {
  bcrypt.hash(password, process.env.SALT_ROUNDS);
};

// Will be used for logging in in the server
export const comparePassword = (password, hash) => {
  bcrypt.compare(password, hash);
};
