const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');

router.post('/signup', (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user
        .save()
        .then(result => {
          console.log(result);
          res.status(201).json({
            message: 'User Created',
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.post('/login', (req, res, next) => {
  let fetchedUser;
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (!user) {
        //user not found
        return res.status(401).json({
          message: 'Auth Failed'
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        //password not matched
        return res.status(401).json({
          message: 'Auth Failed'
        });
      }

      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        'secret-TODO-gen', //TODO Secret Key
        { expiresIn: '1h' }
      );

      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: 'Auth Failed'
      });
    });
});

module.exports = router;
