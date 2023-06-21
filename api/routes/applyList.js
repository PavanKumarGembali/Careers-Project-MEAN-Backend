const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const ApplyList = require("../models/applyList");
const Career = require("../models/career");
// const applyList = require("../models/applyList");
// const career = require("../models/career");

//get all request
router.get("/", (req, res, next) => {
  ApplyList.find()
    .select("_id name email mobile message career")
    .populate('career', 'jobPosition')
    .exec()
    .then((docs) => {
      // console.log(docs);
      res.status(200).json({
        count: docs.length,
        applyList: docs.map((doc) => {
          return {
            _id: doc._id,
            name: doc.name,
            email: doc.email,
            mobile: doc.mobile,
            message: doc.message,
            career: doc.career,
          };
        }),
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

//post request
router.post("/", (req, res, next) => {
  Career.findById(req.body.careerId)
    .then((career) => {
      if (!career) {
        return res.status(404).json({
          message: "Career Not Found",
        });
      }
      const applyList = new ApplyList({
        // _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        message: req.body.message,
        career: req.body.careerId,
      });
      return applyList.save();
    })
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Applied Successfully!",
        createdApplyList: {
          _id: result._id,
          name: result.name,
          email: result.email,
          mobile: result.mobile,
          message: result.message,
          career: result.career,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

//get by ID request
router.get("/:applyId", (req, res, next) => {
  ApplyList.findById(req.params.applyId)
    .exec()
    .then((applyList) => {
      if (!applyList) {
        return res.status(404).json({
          message: "Details not Found",
        });
      }
      res.status(200).json({
        applyList: applyList,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

//delete request
router.delete("/:applyId", (req, res, next) => {
  ApplyList.deleteOne({ _id: req.params.applyId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Deleted Successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
