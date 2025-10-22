require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const dbName = process.env.DB_NAME || "test";
    const uri = `${process.env.MONGO_URI}${dbName}`;

    await mongoose.connect(uri, {
      autoIndex: true,
    });

    console.log(`MongoDB conectado: ${mongoose.connection.name}`);
  } catch (error) {
    console.error("Error conectando a MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
