const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./route/user");
const productRoute = require("./route/product");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;
database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

app.use(express.json());
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});
app.use("/user", userRoute);
app.use("/products", productRoute);
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
