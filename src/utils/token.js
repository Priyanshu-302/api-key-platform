const { signAccessToken, signRefreshToken } = require("./jwt");

// It generates the access(short lived) token
exports.generateAccessToken = (user) => {
  const payload = {
    id: user._id,
  };

  return signAccessToken(payload);
};

// It generates the refresh(long lived) token
exports.generateRefreshToken = (user) => {
  const payload = {
    id: user._id,
  };

  return signRefreshToken(payload);
};
