const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

const User = require('./models/User.cjs');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const JWT_SECRET = 'your_jwt_super_secret_key';

// 1. MongoDB Connection
mongoose.connect('mongodb://localhost:27017/expense_tracker')
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// 2. Nodemailer Transporter Setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const otpStorage = {};

// 3. API: Send OTP for Registration
app.post('/api/send-otp', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, message: 'Email is required' });

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ success: false, message: 'Email is already registered! Please login.' });
  }

  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  otpStorage[email] = otp;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Expense Tracker - Email Verification OTP',
    text: `Your OTP for registration is: ${otp}. Valid for 5 minutes.`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'OTP sent successfully to your email!' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ success: false, message: 'Failed to send OTP email. Check server config.' });
  }
});

// 4. API: Verify OTP & Complete Registration
app.post('/api/verify-and-register', async (req, res) => {
  const { name, email, password, otp } = req.body;

  if (!otpStorage[email] || otpStorage[email] !== otp) {
    return res.status(400).json({ success: false, message: 'Invalid or expired OTP!' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    delete otpStorage[email];

    const token = jwt.sign({ id: newUser._id, email: newUser.email }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ success: true, message: 'Registration successful!', token, user: { name: newUser.name, email: newUser.email } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error registering user', error: error.message });
  }
});

// 5. API: Secure Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Account not found! Please register first.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Incorrect password!' });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ success: true, message: 'Login successful!', token, user: { name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// 6. API: Request Forgot Password OTP
app.post('/api/forgot-password', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, message: 'Email is required' });

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Yeh email registered nahi hai!' });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    otpStorage[email] = otp;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Expense Tracker - Password Reset OTP',
      text: `Aapka password reset karne ke liye OTP yeh hai: ${otp}. Valid for 5 minutes.`
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Password reset OTP email par bhej diya gaya hai!' });
  } catch (error) {
    console.error('Forgot password email error:', error);
    res.status(500).json({ success: false, message: 'Server error during forgot password.' });
  }
});

// 7. API: Verify OTP & Reset Password
app.post('/api/reset-password', async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!otpStorage[email] || otpStorage[email] !== otp) {
    return res.status(400).json({ success: false, message: 'Invalid or expired OTP!' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found!' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    delete otpStorage[email];

    res.json({ success: true, message: 'Password successfully reset ho gaya!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Password reset failed', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});