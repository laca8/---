const mongoose = require("mongoose");
const reportSchema = new mongoose.Schema(
  {
    imp: {
      type: Boolean,
      default: false,
    },
    numReport: {
      type: Number,
      required: true,
    },
    nameUser: {
      type: String,
      required: true,
    },
    communicationReport: {
      type: String,
      required: true,
    },
    eduLevel: {
      type: String,
    },
    eduStatus: {
      type: String,
    },
    marridStatus: {
      type: String,
    },
    workStatus: {
      type: String,
    },
    typeWork: {
      type: String,
    },
    outWork: {
      type: String,
    },
    healthInsure: {
      type: String,
    },
    finSupport: {
      type: String,
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
      required: [true, "الرجاء  ادخال الرقم القومي "],
    },
    connJop: {
      type: String,
    },
    connPhone: {
      type: String,
      required: [true, "الرجاء ادخال رقم التليفون "],
    },
    connPlace: {
      type: String,
      required: [true, "الرجاء  ادخال القرية /الشياخة "],
    },
    connShiek: {
      type: String,
      required: [true, "الرجاء  ادخال المركز/الحي "],
    },
    connRelation: {
      type: String,
    },
    connType: {
      type: String,
    },
    connAge: {
      type: String,
    },
    name: {
      type: String,
    },
    phone: {
      type: String,
      required: [true, "الرجاء  ادخال رقم التليفون "],
    },
    city: {
      type: String,
      required: [true, "الرجاء  ادخال المحافظة "],
    },
    place: {
      type: String,
      required: [true, "الرجاء  ادخال المركز/الحي "],
    },
    shiek: {
      type: String,
      required: [true, "الرجاء  ادخال القرية/الشياخة "],
    },
    type: {
      type: String,
    },
    id: {
      type: String,
      required: [true, "الرجاء  ادخال الرقم القومي "],
    },
    dis: {
      type: String,
      required: [true, "الرجاء  ادخال نوع الاعاقة "],
    },
    reason: {
      type: String,
    },
    report: {
      type: String,
    },
    age: {
      type: String,
    },
    side: {
      type: String,
      required: [true, "الرجاء  ادخال جهة البلاغ "],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("report", reportSchema);
