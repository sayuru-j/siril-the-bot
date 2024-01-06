const mongoose = require("mongoose");

const ConnectDB = async () => {
  try {
    const auth = await mongoose.connect(process.env.MONGODB_URI);

    console.log("Connected to host: " + auth.connection.host);
  } catch (error) {
    console.error("Error connecting MongoDB: ", error.message);
  }
};

module.exports = ConnectDB;
