const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

//Connecting to mongodb
//using promise syncawait
//seomthing to call in server.js

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });

    console.log("Connected to the MongoDB");
  } catch (err) {
    console.error(err.message);
    //exiting the process
    process.exit(1);
  }
};

module.exports = connectDB;
