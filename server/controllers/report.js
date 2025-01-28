const Report = require("../models/Report");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const addReport = asyncHandler(async (req, res) => {
  var start = new Date();
  start.setHours(0, 0, 0, 0);

  var end = new Date();
  end.setHours(23, 59, 59, 999);
  const reports = await Report.find({ createdAt: { $gte: start, $lt: end } });

  console.log(reports.length);
  var dt = new Date();
  var year = dt.getFullYear().toString().slice(-2);
  var month = (dt.getMonth() + 1).toString().padStart(2, "0");
  var day = dt.getDate().toString().padStart(2, "0");
  var t = (reports.length + 1).toString().padStart(3, "0");
  //console.log(`${year}${month}${day}${t + 1}`);
  const numReport = `${year}${month}${day}${t}.`;
  const {
    name,
    phone,
    age,
    id,
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
    nameUser,
    communicationReport,
    eduLevel,
    eduStatus,
    marridStatus,
    workStatus,
    typeWork,
    outWork,
    healthInsure,
    finSupport,
    city,
    place,
    shiek,
    type,
    dis,
    reason,
    side,
  } = req.body;
  //console.log(req.body);
  const newReport = new Report({
    name,
    phone,
    age,
    id,
    numReport,
    report,
    connName,
    connCity,
    connShiek,

    connId,
    connJop,
    connPhone,
    connPlace,
    connRelation,
    connType,
    connAge,
    city,
    place,
    shiek,
    nameUser,
    communicationReport,
    eduLevel,
    eduStatus,
    marridStatus,
    workStatus,
    typeWork,
    outWork,
    healthInsure,
    finSupport,

    type,
    dis,
    reason,
    side,
  });
  await newReport.save();
  res.status(200).json({ msg: "success", data: newReport });
});
const getReport = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const report = await Report.findById({ _id: id });
  if (!report) {
    return next(new ApiError("لا يوجد بلاغ يتماشي مع هذه البيانات"));
  }
  res.json({ msg: "success", data: report });
});
const getReports = asyncHandler(async (req, res) => {
  // console.log("laca");

  // console.log(req.query);

  const k1 = req.query.numReport
    ? {
        numReport: Number(req.query.numReport),
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
  const k4 = req.query.name
    ? {
        name: {
          $regex: req.query.name,
          $options: "i",
        },
      }
    : {};
  const k5 = req.query.city
    ? {
        city: {
          $regex: req.query.city,
          $options: "i",
        },
      }
    : {};
  const k6 = req.query.place
    ? {
        place: {
          $regex: req.query.place,
          $options: "i",
        },
      }
    : {};
  const k7 = req.query.shiek
    ? {
        shiek: {
          $regex: req.query.shiek,
          $options: "i",
        },
      }
    : {};
  // console.log("user:", req.user);

  const reports = await Report.find({
    ...k1,
    ...k2,
    ...k3,
    ...k4,
    ...k5,
    ...k6,
    ...k7,
  });
  if (req.user.isAdmin == "true") {
    return res.status(200).json({
      msg: "success",
      results: reports.length,
      data: reports,
    });
  } else if (
    req.user.isAdmin == "false" &&
    req.user.permission.first == "المحافظة"
  ) {
    return res.status(200).json({
      msg: "success",
      results: reports?.filter((x) => x.city == req.user.permission.second)
        .length,
      data: reports?.filter((x) => x.city == req.user.permission.second),
    });
  } else if (
    req.user.isAdmin == "false" &&
    req.user.permission.first == "القسم"
  ) {
    return res.status(200).json({
      msg: "success",
      results: reports?.filter((x) => x.place == req.user.permission.second)
        .length,
      data: reports?.filter((x) => x.place == req.user.permission.second),
    });
  } else if (
    req.user.isAdmin == "false" &&
    req.user.permission.first == "الشياخة"
  ) {
    return res.status(200).json({
      msg: "success",
      results: reports?.filter((x) => x.shiek == req.user.permission.second)
        .length,
      data: reports?.filter((x) => x.shiek == req.user.permission.second),
    });
  }
});
const updateReport = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    imp,
    side,
    eduStatus,
    eduLevel,
    workStatus,
    outWork,
    typeWork,
    marridStatus,
    finSupport,
    healthInsure,
    connName,
    connCity,
    connId,
    connJop,
    connPhone,
    connPlace,
    connRelation,
    connType,
    connAge,
    connShiek,
    name,
    phone,
    city,
    place,
    type,
    ids,
    dis,
    reason,
    age,
  } = req.body;
  const report = await Report.findOneAndUpdate(
    { _id: id },
    {
      imp,
      side,
      eduStatus,
      eduLevel,
      workStatus,
      outWork,
      typeWork,
      marridStatus,
      finSupport,
      healthInsure,
      connName,
      connCity,
      connId,
      connJop,
      connPhone,
      connPlace,
      connRelation,
      connType,
      connAge,
      connShiek,
      name,
      phone,
      city,
      place,
      type,
      ids,
      dis,
      reason,
      age,
    },
    {
      new: true,
    }
  );
  //console.log(req.body);
  res.status(200).json({ msg: true, data: report });
});
module.exports = {
  addReport,
  getReports,
  getReport,
  updateReport,
};
