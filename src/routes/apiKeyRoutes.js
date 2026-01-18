const router = require("express").Router();

const { authHandler } = require("../middlewares/authMiddleware");
const {
  createApiKey,
  getAllApiKeys,
  revokeApiKey,
} = require("../controllers/apiKeyController");

router.post("/", authHandler, createApiKey);
router.get("/", authHandler, getAllApiKeys);
router.delete("/:id", authHandler, revokeApiKey);

module.exports = router;
