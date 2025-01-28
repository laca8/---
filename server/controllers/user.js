const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const createToken = (payload) => {
  return jwt.sign({ userId: payload }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.EXPIRE_TIME,
  });
};
const register = asyncHandler(async (req, res, next) => {
  const { username, password, permission } = req.body;
  if (!username || !password) {
    return next(new ApiError("الرجاء ادخال جميع البيانات", 500));
  }
  const user = await User.findOne({ username: username });
  if (user) {
    return next(new ApiError("هذا الاسم مستخدم بالفعل", 500));
  }
  const newUser = await User.create({
    username,
    password,
    permission,
  });
  const createdUser = {
    username: newUser.username,
    permission: newUser.permission,
    isAdmin: newUser.isAdmin,
  };
  const token = createToken(newUser._id);
  return res.status(201).json({ data: createdUser, token });
});

const login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  if (!user) {
    return next(
      new ApiError(" يوجد خطا في جميع البيانات الرجاء ادخالها مرة اخري", 500)
    );
  }

  const match = await bcrypt.compareSync(password, user.password);
  if (!match) {
    return next(
      new ApiError("يوجد خطا في البيانات الرجاء ادخالها مرة اخري", 500)
    );
  }
  const createdUser = {
    username: user.username,
    permission: user.permission,
    isAdmin: user.isAdmin,
  };
  const token = createToken(user._id);
  return res.status(201).json({ data: createdUser, token });
});

const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({}).select("username _id isAdmin permission");
  //console.log(usersFilter);

  res.status(200).json({ msg: "success", data: users });
});

const deleteUsers = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete({ _id: id });

  res.status(200).json({ msg: "success" });
});

module.exports = {
  register,
  login,
  getUsers,
  deleteUsers,
};
