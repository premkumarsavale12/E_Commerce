
require("dotenv").config();

const express = require("express");

const cors = require("cors");

const bodyParser = require("body-parser")

const connectDb = require("./config/db");
const herosectionRoutes = require("./routes/herosection");
const sellerRoutes = require("./routes/sellerProduct");
const footerRoute = require("./routes/footersection")

const app = express();

connectDb();

app.use(cors());

app.use(bodyParser.json());

app.use("/api/auth", require("./routes/auth"));

app.use("/api/hero_section", herosectionRoutes);

app.use("/api/sellerproduct", sellerRoutes);


app.use("/api/footersection", footerRoute);

app.listen(5000, () => {
    console.log("Server Running on port 5000");

})
