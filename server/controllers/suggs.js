const Suggestion = require("../models/Suggestion");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const addSuggestion = asyncHandler(async (req, res) => {
  const suggs = await Suggestion.find();
  console.log(suggs.length);
  var dt = new Date();
  var year = dt.getFullYear().toString().slice(-2);
  var month = (dt.getMonth() + 1).toString().padStart(2, "0");
  var day = dt.getDate().toString().padStart(2, "0");
  var t = (suggs.length + 1).toString().padStart(3, "0");
  //console.log(`${year}${month}${day}${t + 1}`);
  const numSugg = `${year}${month}${day}${t}.`;
  const {
    suggType,
    nameUser,
    communicationSugg,
    suggSide,
    report,
    connName,
    connCity,
    connId,
    connJop,
    connPhone,
    connPlace,
    connShiek,

    connRelation,
    connType,
    connAge,

    reason,
    side,
  } = req.body;
  //console.log(req.body);
  const newReport = new Suggestion({
    suggType,
    numSugg,
    report,
    connName,
    connCity,
    connId,
    connJop,
    connPhone,
    connPlace,
    connShiek,
    nameUser,
    communicationSugg,
    suggSide,
    connRelation,
    connType,
    connAge,
    reason,
    side,
  });
  await newReport.save();
  res.status(200).json({ msg: "success", data: newReport });
});
const getSuggestion = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const suggestion = await Suggestion.findById(id);
  if (!suggestion) {
    return next(new ApiError("لا يوجد بيانات", 500));
  }
  res.json({ msg: "success", data: suggestion });
});
const getSuggestions = asyncHandler(async (req, res) => {
  // console.log(req.query);

  const k1 = req.query.numSugg
    ? {
        numSugg: Number(req.query.numSugg),
      }
    : {};

  const k2 = req.query.connName
    ? {
        connName: {
          $regex: req.query.connName,
          $options: "i",
        },
      }
    : {};
  const k3 = req.query.connPhone
    ? {
        connPhone: {
          $regex: req.query.connPhone,
          $options: "i",
        },
      }
    : {};
  const k4 = req.query.side
    ? {
        side: {
          $regex: req.query.side,
          $options: "i",
        },
      }
    : {};
  const suggestions = await Suggestion.find({ ...k1, ...k2, ...k3, ...k4 });
  res.status(200).json({
    msg: "success",
    results: suggestions.length,
    data: suggestions,
  });
});
const updateSuggestion = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const suggestion = await Suggestion.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  if (!suggestion) {
    return next(new ApiError("لا يوجد بيانات", 500));
  }
  res.status(200).json({ msg: true, data: suggestion });
});
module.exports = {
  addSuggestion,
  getSuggestions,
  getSuggestion,
  updateSuggestion,
};
