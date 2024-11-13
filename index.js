const express = require("express");
const dbConnect = require("./config/dbConnect"); 
const dotenv = require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 4000;
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const productRoute =require("./routes/productRoute");
const orderRoute =require("./routes/orderRoute");
const deliveryRoute= require("./routes/deliveryRoute");
const discountRoute = require("./routes/discountRoute");
const promotionRoute = require ("./routes/promtionRoute");

// Database Connection
dbConnect();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use("/api/user", authRoutes);
app.use("/api/product", productRoute);
app.use("/api/order", orderRoute);
app.use("/api/delivery", deliveryRoute);
app.use("/api/discount/discount", discountRoute);
app.use("/api/promotionRoute", promotionRoute);


app.use(notFound);
app.use(errorHandler);


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`); 
});
