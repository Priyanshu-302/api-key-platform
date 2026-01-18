const jwt = require("jsonwebtoken");

// Will be used for signing in the access token
exports.signAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.EXPIRES_ACCESS_IN,
  });
};

// Will be used for verifying the access token
exports.verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
};

// Will be used for signing in the refresh token
exports.signRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.EXPIRES_REFRESH_IN,
  });
};