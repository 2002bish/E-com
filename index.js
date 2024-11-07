const express = require("express");
const dbConnect = require("./config/dbConnect"); // Remove .default
const dotenv = require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 4000;
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const productRoute =require("./routes/productRoute");
// Connect to the database
dbConnect();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use("/api/user", authRoutes);
app.use("/api/product", productRoute);

app.use(notFound);
app.use(errorHandler);
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`); // Use backticks for template literal
});
