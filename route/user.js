const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ error: err });
    } else {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        password: hash,
        phone: req.body.phone,
        email: req.body.email,
        userType: req.body.userType,
      });
      user
        .save()
        .then((result) => {
          res.status(200).json({
            new_user: result,
            status: "Registered Sucessfully",
          });
        })
        .catch((err) => {
          error: err;
        });
    }
  });
});

router.post("/login", (req, res, next) => {
  User.find({ username: req.body.username })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "User does not exists!!",
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (!result) {
          return res.status(401).json({
            message: "Incorrect Password",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              username: user[0].username,
              phone: user[0].phone,
              email: user[0].email,
              userType: user[0].userType,
            },
            process.env.SECRET_JWT_KEY,
            {
              expiresIn: "24h",
            }
          );
          res.status(200).json({
            username: user[0].username,
            phone: user[0].phone,
            email: user[0].email,
            userType: user[0].userType,
            token: token,
          });
        }
      });
    })
    .catch((err) => {
      res.status(501).json({
        message: err,
      });
    });
});

// router.get("/getUsers", async (req, res, next) => {
//   try {
//     const data = await User.find();
//     res.status(200).json(data);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
module.exports = router;
