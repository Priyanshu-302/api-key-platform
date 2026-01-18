const { verifyAccessToken } = require("../utils/jwt");

const authHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  const decoded = verifyAccessToken(token);

  req.user = decoded;

  next();
};

module.exports = { authHandler };
