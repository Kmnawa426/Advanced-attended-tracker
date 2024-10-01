const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB Atlas using the connection string from .env file
mongoose.connect(process.env.MONGODB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// User Schema and Model
const User = require('./models/User');

// app.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }

  // Create a new user
  const user = new User({ email, password });
  await user.save();
  res.status(201).json({ message: 'Signup successful!' });
});


// app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Check user credentials
  const user = await User.findOne({ email });
  if (!user || user.password !== password) {
    return res.status(400).json({ error: 'Invalid email or password' });
  }

  // Send back user subjects or other relevant info
  res.status(200).json({ message: 'Login successful!', subjects: user.subjects });
});


// Add Subjects Route
app.post('/add-subject', async (req, res) => {
  const { email, subject } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    user.subjects.push(subject);
    await user.save();
    res.status(200).json({ message: 'Subject added' });
  } else {
    res.status(400).json({ error: 'User not found' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
