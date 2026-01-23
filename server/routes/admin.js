const router = require('express').Router();
const User = require('../models/User');
const Attendance = require('../models/Attendance');
const Leave = require('../models/Leave');
const verify = require('./verifyToken');

// DEBUG TEST ROUTE
router.put('/test', (req, res) => {
    console.log("PUT /api/admin/test HIT!");
    res.json({ message: "Admin Test Route Works" });
});

// GET ALL USERS
router.get('/users', verify, async (req, res) => {
    if (req.user.role !== 'Admin') return res.status(403).send('Access Denied');
    try {
        const users = await User.find({}, '-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// UPDATE SPECIFIC USER
router.put('/users/:id', verify, async (req, res) => {
    console.log(`[DEBUG] PUT /users/${req.params.id}`, req.body); // Log receipt
    if (req.user.role !== 'Admin') return res.status(403).send('Access Denied');
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                    role: req.body.role,
                    position: req.body.position,
                    salary: req.body.salary
                }
            },
            { new: true }
        );
        if (!updatedUser) return res.status(404).send('User not found');
        res.json(updatedUser);
    } catch (err) {
        console.error("UPDATE USER ERROR:", err);
        res.status(500).json({ error: err.message });
    }
});

// DELETE SPECIFIC USER
router.delete('/users/:id', verify, async (req, res) => {
    if (req.user.role !== 'Admin') return res.status(403).send('Access Denied');
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).send('User not found');
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE ALL USERS (Except Admin)
router.delete('/users', verify, async (req, res) => {
    if (req.user.role !== 'Admin') return res.status(403).send('Access Denied');
    try {
        const result = await User.deleteMany({ email: { $ne: 'admin@company.com' } });
        res.json({ message: `Deleted ${result.deletedCount} users.` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE ALL ATTENDANCE
router.delete('/attendance', verify, async (req, res) => {
    if (req.user.role !== 'Admin') return res.status(403).send('Access Denied');
    try {
        const result = await Attendance.deleteMany({});
        res.json({ message: `Deleted ${result.deletedCount} attendance records.` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE ALL LEAVES
router.delete('/leaves', verify, async (req, res) => {
    if (req.user.role !== 'Admin') return res.status(403).send('Access Denied');
    try {
        const result = await Leave.deleteMany({});
        res.json({ message: `Deleted ${result.deletedCount} leave requests.` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
