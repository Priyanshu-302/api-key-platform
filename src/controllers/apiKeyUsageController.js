const { checkUsage } = require("../services/apiKeyUsage");

exports.checkApiUsage = async (req, res, next) => {
  try {
    const usage = await checkUsage(req.apiKey);
    res.status(200).json({
      message: "API usage checked successfully",
      usage,
    });
  } catch (error) {
    next(error);
  }
};
