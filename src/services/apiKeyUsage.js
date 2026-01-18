const {
  getApiUsage,
  incrementApiUsage,
} = require("../models/apiKeyUsageModel");

// This the typical rate limiter
exports.checkUsage = async (key) => {
  const today = new Date().toISOString().slice(0, 10);
  const usage = await getApiUsage(key.id, today);

  if (usage && usage.request_count >= key.daily_limit) {
    throw new Error("Daily limit exceeded");
  }

  await incrementApiUsage(key.id, today);
};
