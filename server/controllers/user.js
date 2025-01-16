const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const register = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
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
  });
  res.status(200).json({ msg: "success", data: newUser });
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

  return res.status(200).json({ msg: "success", data: user });
});

const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({}).select("username _id isAdmin");

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
