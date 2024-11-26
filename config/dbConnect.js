const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      writeConcern: { w: "majority", wtimeout: 1000 } // Ensures proper write concern
    });
    console.log(`\nMongoDB connected! DB HOST: ${conn.connection.host}`);
  } catch (error) {
    console.error("MONGODB connection FAILED", error);
    process.exit(1);
  }
};

module.exports = dbConnect;
