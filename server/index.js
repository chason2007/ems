// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const attendanceRoutes = require('./routes/attendance');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/attendance', attendanceRoutes);

// Connect to MongoDB (Replace with your Atlas string later)
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/employeeDB')
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Routes


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));