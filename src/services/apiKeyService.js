const { createApiKey, getApiKeyByRawKey } = require("../models/apiKeyModel");
const { generateApiKey, hashApiKey, compareApiKey } = require("../utils/apiKey");

// Create new API key and store hash & raw key
exports.createKey = async (userId, keyName) => {
  const rawKey = generateApiKey();
  const keyHash = await hashApiKey(rawKey);

  await createApiKey(userId, keyName, rawKey, keyHash);

  return rawKey; // send this to client
};

// Validate incoming API key
exports.validateApiKey = async (rawKey) => {
  const apiKey = await getApiKeyByRawKey(rawKey);
  if (!apiKey) return null;

  const isValid = await compareApiKey(rawKey, apiKey.key_hash);
  return isValid ? apiKey : null;
};
