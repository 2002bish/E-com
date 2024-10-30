const mongoose = require("mongoose");

const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`, { // Ensure DB_NAME is in your .env file
      
            useUnifiedTopology: true,
        });
        console.log(`\nMongoDB connected! DB HOST: ${conn.connection.host}`);
    } catch (error) {
        console.error("MONGODB connection FAILED", error);
        process.exit(1);
    }
};

module.exports = dbConnect;
