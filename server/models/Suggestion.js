const mongoose = require("mongoose");
const suggSchema = new mongoose.Schema(
  {
    numSugg: {
      type: Number,
      required: true,
    },
    nameUser: {
      type: String,
      required: true,
    },
    communicationSugg: {
      type: String,
      required: true,
    },
    connName: {
      type: String,
      required: [true, "الرجاء  ادخال اسم المتصل"],
    },
    connCity: {
      type: String,
      required: [true, "الرجاء  ادخال المحافظة "],
    },
    connId: {
      type: String,
    },
    connJop: {
      type: String,
    },
    connPhone: {
      type: String,
      required: [true, "الرجاء  ادخال رقم التليفون "],
    },
    connPlace: {
      type: String,
      required: [true, "الرجاء  ادخال القرية /الشياخة "],
    },
    connShiek: {
      type: String,
      required: [true, "الرجاء  ادخال المركز/الحي "],
    },
    connType: {
      type: String,
    },
    connAge: {
      type: String,
    },
    suggType: {
      type: String,
      required: [true, "الرجاء  ادخال نوع الاستعلام "],
    },
    report: {
      type: String,
    },
    side: {
      type: String,
      required: [true, "الرجاء  ادخال جهة الاستعلام "],
    },
    suggSide: {
      type: String,
      required: [true, "الرجاء  ادخال جهة الاستفسار "],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("sugg", suggSchema);
