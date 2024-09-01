const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');
const JWT_SECRET = 'iAmAV$ryGoodBoy';



// ROUTE: 1 -> Creates a User - POST: "/api/auth" - Doesn't require Login
router.post('/createuser', [
  // User data validations
  body('username').notEmpty().isString().custom(value => !/\s/.test(value)),
  body('password', 'Enter a valid password').notEmpty().isString(),
  body('confirmPassword', 'Enter a valid password').notEmpty().isString(),
],
  async (req, res) => {
    // Performing validation functions
    const error = validationResult(req);
    try {
      if (!error.isEmpty()) {
        return res.status(400).json({ success: false, errors: error.array(), message:'Please enter valid data in the form' })
      } else {
        if (req.body.password !== req.body.confirmPassword) { 
          return res.status(400).json({ success: false, errors: 'Passwords do not match!' });
        }
        let createdUser = await User.findOne({ username: req.body.username });
        if (createdUser) {
          // Returns error if user already exists
          return res.status(400).json({ success: false, error: "User already exists", message: "Username is already taken, please try another username" });
        } else {
          let salt = await bcrypt.genSalt(10)
          let securedPasswrod = await bcrypt.hash(req.body.password, salt);
          // User creation
          createdUser = await User.create({
            username: req.body.username,
            password: securedPasswrod,
          })
          let save = await createdUser.save();
          const data = {
            user: {
              id: createdUser._id,
            }
          }
          let token = jwt.sign(data, JWT_SECRET);
          return res.json({ success: true, authtoken: token });
        }
      }
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ success: false, error: 'Some error occured', message: 'Some technical error occured, Please try again later' });
    }
  });


// ROUTE: 2 -> Authenticates a user - POST: "/api/auth/login" - Doesn't require Login
router.post('/login', [

  // User data validations
  body('username').notEmpty().isString().custom(value => !/\s/.test(value)),
  body('password').notEmpty().isString(),
],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ success: false, errors: error.array(), message: 'Please enter valid data in the form' });
    }
    const { username, password } = req.body;
    try {
      let user = await User.findOne({ username: username });
      if (!user) {
        return res.status(401).json({ success: false, error: 'Invalid credentials', message: 'Please try to use correct credentials' });
      }
      const passwordVal = await bcrypt.compare(password, user.password);
      if (!passwordVal) {
        return res.status(401).json({ success: false, error: 'Invalid credentials', message: 'Please try to use correct credentials' });
      }
      const data = {
        user: {
          id: user._id,
        }
      }
      const token = jwt.sign(data, JWT_SECRET);
      res.json({ success: true, authtoken: token });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ success: false, error: 'Some error occurred', message: 'ome technical error occured, Please try again later' });
    }
  })


// ROUTE: 3 -> Get Logged in user details using id - POST: "/api/auth/" - Login Required
router.post('/getuser', fetchUser, async (req, res) => {
  try {
    let userId = req.user.id;
    const user = await User.findById(userId).select('-password').select('-__v');
    return res.json({ success: true, user: user });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Some error occured', message: 'ome technical error occured, Please try again later' });
  }
})


module.exports = router;