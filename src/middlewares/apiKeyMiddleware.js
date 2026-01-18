const { validateApiKey } = require("../services/apiKeyService");
const { checkUsage } = require("../services/apiKeyUsage"); // optional usage tracking

const apiKeyHandler = async (req, res, next) => {
  try {
    const rawKey = req.headers["x-api-key"];
    if (!rawKey) return res.status(401).json({ error: "API Key Required" });

    const apiKey = await validateApiKey(rawKey);
    if (!apiKey) return res.status(401).json({ error: "Invalid API Key" });

    // optional: track daily usage
    if (checkUsage) await checkUsage(apiKey);

    req.apiKey = apiKey; // attach API key info to request
    next();
  } catch (err) {
    console.error("API Key Middleware Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { apiKeyHandler };
