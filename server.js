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

// Signup Route
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword });

  try {
    await user.save();
    res.status(201).send('User created');
  } catch (err) {
    res.status(400).send('Error signing up');
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && await bcrypt.compare(password, user.password)) {
    res.status(200).json({ subjects: user.subjects });
  } else {
    res.status(400).send('Invalid credentials');
  }
});

// Add Subjects Route (User-specific)
app.post('/add-subject', async (req, res) => {
  const { email, subject } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    user.subjects.push(subject);
    await user.save();
    res.status(200).send('Subject added');
  } else {
    res.status(400).send('User not found');
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
