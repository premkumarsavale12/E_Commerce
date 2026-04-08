
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")
const path = require("path");
const fs = require("fs");

const connectDb = require("./config/db");
const herosectionRoutes = require("./routes/herosection");
const sellerRoutes = require("./routes/sellerProduct");
const footerRoute = require("./routes/footersection");
const section_1 = require("./routes/section_1");
const section_2 = require("./routes/section_2");
const new_launch = require("./routes/new_launch");
const Collection = require("./routes/collection");
const Category = require("./routes/category");
const Concern = require("./routes/concern");
const body = require("./routes/body");
const skin = require("./routes/skin");
const hair = require("./routes/hair");
const lip = require("./routes/lip");
const best_seller = require("./routes/best_seller");
const baby_care = require("./routes/baby_care");
const skin_insights = require("./routes/skin_insights");
const Ai_Powered = require("./routes/ai_powered");


const app = express();

connectDb();

app.use(cors());

app.use(bodyParser.json());


const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

app.use("/uploads", express.static(uploadDir));

app.use("/api/auth", require("./routes/auth"));

app.use("/api/hero_section", herosectionRoutes);

app.use("/api/sellerproduct", sellerRoutes);

app.use("/api/footersection", footerRoute);

app.use("/api/section_1", section_1);

app.use("/api/section_2", section_2);

app.use("/api/new_launch", new_launch);

app.use("/api/collection", Collection);

app.use("/api/category", Category);

app.use("/api/concern", Concern);

app.use("/api/body", body);

app.use("/api/skin", skin);

app.use("/api/hair", hair);

app.use("/api/lip", lip);

app.use("/api/best_seller", best_seller);

app.use("/api/baby_care", baby_care);

app.use("/api/skin_insights", skin_insights);

app.use("/api/ai_powered", Ai_Powered);


app.listen(5000, () => {
    console.log("Server Running on port 5000");

})
