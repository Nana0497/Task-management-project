const express = require('express');
const User = require('../models/user');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 

router.get('/', (req, res) => {
  res.send('User route is working!');
});

// Register a user
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).send({ user, message: 'User created successfully' });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// Login a user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }); 
    if (!user) {
      throw new Error('Unable to login: invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Unable to login: invalid credentials');
    }

    const token = jwt.sign(
      { _id: user._id.toString() },
      process.env.JWT_SECRET_KEY || 'default_secret', 
      { expiresIn: '1h' }
    );

    res.send({ user, token, message: 'Logged in successfully' });
  } catch (err) {
    res.status(400).send({ error: err.message }); 
  }
});

module.exports = router;
