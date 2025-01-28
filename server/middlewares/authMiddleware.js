// server/middleware/auth.js
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/apiError");
const User = require("../models/User");
// Middleware to verify Firebase ID token
const verifyToken = async (req, res, next) => {
  try {
    if (req.headers.authorization && req.headers.authorization) {
      token = req.headers.authorization;
    }
    if (!token) {
      return next(new ApiError("please login.", 400));
    }
    //verify token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    //check if user exists
    const currentUser = await User.findById(decoded.userId);
    if (!currentUser) {
      return next(new ApiError("user not found.", 404));
    }
    req.user = {
      _id: currentUser._id,
      username: currentUser.username,
      isAdmin: currentUser.isAdmin,
      permission: currentUser.permission,
    };
    // console.log(req.user);
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return next(new ApiError("please login again.", 500));
  }
};

module.exports = verifyToken;
