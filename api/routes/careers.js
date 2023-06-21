const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Career = require("../models/career");

//get all careers
router.get("/", (req, res, next) => {
  Career.find()
    .select("jobPosition location experience dateOfPost qualification _id")
    .exec()
    .then((docs) => {
      //   console.log(docs);
      const response = {
        count: docs.length,
        careers: docs.map((doc) => {
          return {
            jobPosition: doc.jobPosition,
            location: doc.location,
            experience: doc.experience,
            dateOfPost: doc.dateOfPost,
            qualification: doc.qualification,
            _id: doc._id,
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

//post a career
router.post("/", (req, res, next) => {
  // const career = {
  //     jobPosition: req.body.jobPosition,
  //     location: req.body.location,
  //     experience: req.body.experience,
  //     dateOfPost: req.body.dateOfPost,
  //     qualification: req.body.qualification
  // };
  const career = new Career({
    _id: new mongoose.Types.ObjectId(),
    jobPosition: req.body.jobPosition,
    location: req.body.location,
    experience: req.body.experience,
    dateOfPost: req.body.dateOfPost,
    qualification: req.body.qualification,
  });
  career
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "career created Successfully",
        createdCareer: {
          jobPosition: result.jobPosition,
          location: result.location,
          experience: result.experience,
          dateOfPost: result.dateOfPost,
          qualification: result.qualification,
          _id: result._id,
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

//get a career by its ID
router.get("/:careerId", (req, res, next) => {
  const id = req.params.careerId;
  Career.findById(id)
    .select("jobPosition location experience dateOfPost qualification _id")
    .exec()
    .then((doc) => {
      console.log(doc);
      if (doc) {
        res.status(200).json({
          career: doc,
        });
      } else {
        res.status(404).json({
          message: "No valid Data found with this ID!",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

//update Function
// router.patch("/:careerId", (req, res, next) => {
//   const id = req.params.careerId;
//   const updateOps = {};
//   for (const ops of req.body) {
//     updateOps[ops.propName] = ops.value;
//   }
//   Career.updateOne(
//     { _id: id },
//     {
//       $set: updateOps,
//     }
//   ).exec()
//   .then(result=>{
//     console.log(result);
//     res.status(200).json(result);
//   })
//   .catch(err=>{
//     console.log(err);
//     res.status(500).json({
//         error:err
//     });
//   });
// });

//delete Function

router.delete("/:careerId", (req, res, next) => {
  const id = req.params.careerId;
  Career.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Career deleted Succesfully!",
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
