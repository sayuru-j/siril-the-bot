const mongoose = require("mongoose");

async function connectDatabase(MONGO_DB_URI) {
  try {
    const db = await mongoose.connect(MONGO_DB_URI);

    console.log(`Connected to MongoDB:[${db.connection.host}]`);
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = {
  connectDatabase,
};
