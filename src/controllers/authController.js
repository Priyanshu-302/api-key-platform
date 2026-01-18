const { register, login } = require("../services/authService");
const { generateAccessToken, generateRefreshToken } = require("../utils/token");

exports.registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Something went wrong" });
    }

    const user = await register(email, password);
    res.status(200).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Something went wrong" });
    }

    const user = await login(email, password);

    const accessToken = generateAccessToken({ id: user.id });
    const refreshToken = generateRefreshToken({ id: user.id });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });
    res.status(200).json({
      message: "User logged in successfully",
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};
