const router = require("express").Router();

const { apiKeyHandler } = require("../middlewares/apiKeyMiddleware");
const { checkApiUsage } = require("../controllers/apiKeyUsageController");

router.get("/", apiKeyHandler, checkApiUsage);

module.exports = router;