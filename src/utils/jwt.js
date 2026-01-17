const jwt = require("jsonwebtoken");

// Will be used for signing in the access token
export const signAccessToken = (payload) => {
  jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.EXPIRES_ACCESS_IN,
  });
};

// Will be used for verifying the access token
export const verifyAccessToken = (token) => {
  jwt.verify(token, process.env.JWT_ACCESS_SECRET);
};

// Will be used for signing in the refresh token
export const signRefreshToken = (payload) => {
  jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.EXPIRES_REFRESH_IN,
  });
};

// Will be used for verifying the refresh token
export const verifyRefreshToken = (token) => {
  jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};