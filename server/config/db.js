const mongoose = require("mongoose");
const connDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://laca:jae09908@cluster0.gjxhg.mongodb.net/disables"
    );
    console.log("db connected...");
  } catch (err) {
    console.log(`mongoError${err}`);
  }
};

module.exports = connDb;
