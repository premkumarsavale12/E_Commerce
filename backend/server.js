
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")
const path = require("path");
const fs = require("fs");

const connectDb = require("./config/db");
const herosectionRoutes = require("./routes/herosection");
const sellerRoutes = require("./routes/sellerProduct");
const footerRoute = require("./routes/footersection")
const section_1 = require("./routes/section_1")
const section_2 = require("./routes/section_2")
const new_launch = require("./routes/new_launch");
const Shop = require("./routes/shop")
const app = express();

connectDb();

app.use(cors());

app.use(bodyParser.json());

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Serve static files from the uploads directory
app.use("/uploads", express.static(uploadDir));

app.use("/api/auth", require("./routes/auth"));

app.use("/api/hero_section", herosectionRoutes);

app.use("/api/sellerproduct", sellerRoutes);

app.use("/api/footersection", footerRoute);

app.use("/api/section_1", section_1);

app.use("/api/section_2", section_2);

app.use("/api/new_launch", new_launch);

app.use("/api/shop", Shop);

app.listen(5000, () => {
    console.log("Server Running on port 5000");

})
