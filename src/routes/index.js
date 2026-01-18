const router = require("express").Router();
const authRoutes = require("../routes/authRoutes");
const apiKeyRoutes = require("../routes/apiKeyRoutes");
const apiUsageRoutes = require("../routes/apiUsageRoutes");

router.use("/auth", authRoutes);
router.use("/keys", apiKeyRoutes);
router.use("/data", apiUsageRoutes);

module.exports = router;