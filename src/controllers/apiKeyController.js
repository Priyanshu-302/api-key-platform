const { createKey } = require("../services/apiKeyService");
const {
  getApiKeysByUserId,
  revokeApiKeyByUserId,
} = require("../models/apiKeyModel");

exports.createApiKey = async (req, res, next) => {
  try {
    const key = await createKey(req.user.id, req.body.key_name);
    res.status(200).json({
      message: "API key created successfully",
      apiKey: key,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllApiKeys = async (req, res, next) => {
  try {
    const keys = await getApiKeysByUserId(req.user.id);
    res.status(200).json({
      message: "API keys fetched successfully",
      keys,
    });
  } catch (error) {
    next(error);
  }
};

exports.revokeApiKey = async (req, res, next) => {
  try {
    await revokeApiKeyByUserId(req.params.id, req.user.id);
    res.status(200).json({
      message: "API key revoked successfully",
    });
  } catch (error) {
    next(error);
  }
};
