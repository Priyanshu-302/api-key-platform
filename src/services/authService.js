const { createUser, findUserByEmail } = require("../models/userModel");
const { hashedPassword, comparePassword } = require("../utils/password");

// This is the only business logic for the register of user
exports.register = async (email, password) => {
  const hash = await hashedPassword(password);
  await createUser(email, hash);
};

// This is the only business logic for the login of user
exports.login = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  return user;
};
