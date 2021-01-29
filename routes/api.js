const router = require("express").Router();
const db = require("../models");
// route for getting the workouts and adding the total duration of time
router.get("/api/workouts", (req, res) => {
  db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
      },
    },
  ])
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});
// route for submitting a new workout
router.post("/api/workouts", (req, res) => {
  db.Workout.create({})
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});
//route for finding the total duration of a workout within a given range
router.get("/api/workouts/range", (req, res) => {
  db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
      },
    },
  ])
    .limit(7)
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});
//route for updating a specific workout
router.put("/api/workouts/:id", (req, res) => {
  db.Workout.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        exercises: req.body,
      },
    },
    { new: true, runValidators: true }
  )
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});
module.exports = router;
