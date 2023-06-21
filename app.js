const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const { MongoClient } = require("mongodb");

const careerRoutes = require("./api/routes/careers");
const applyListRoutes = require("./api/routes/applyList");

const uri =
  "mongodb+srv://careerPortal:career123@careerscluster.h6mjfrf.mongodb.net/JobPortal";

mongoose.connect(uri, {
  connectTimeoutMS: 30000,
  socketTimeoutMS: 30000,
});

const client = new MongoClient(uri, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 30000,
});
mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "PUT, POST, PATCH, GET, DELETE, "
    );
    return res.status(200).json({});
  }
  next();
});

//routes to handel requiests
app.use("/careers", careerRoutes);
app.use("/applyList", applyListRoutes);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, nest) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
