const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const User = require('./models/User');
require('dotenv').config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.DB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error: ', err));

// Route to create a new email user
app.post('/api/users', async (req, res) => {
  const { email, password } = req.body;

  const newUser = new User({ email, password });
  try {
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to send an email
app.post('/api/send-email', async (req, res) => {
  const { to, subject, text, userEmail, userPassword } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: userEmail,
      pass: userPassword,
    }
  });

  const mailOptions = {
    from: userEmail,
    to: to,
    subject: subject,
    text: text
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Starting the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
