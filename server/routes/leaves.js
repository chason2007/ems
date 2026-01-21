const express = require('express');
const router = express.Router();
const Leave = require('../models/Leave');
// Import the middleware
const { verifyToken, isAdmin } = require('../middleware/auth');

// PUBLIC ROUTE: Submit a leave request (Any logged-in user)
router.post('/request', verifyToken, async (req, res) => {
    const newLeave = new Leave({
        userId: req.user._id, // Taken from the token!
        reason: req.body.reason,
        dates: req.body.dates,
        status: 'Pending'
    });

    try {
        const savedLeave = await newLeave.save();
        res.json(savedLeave);
    } catch (err) {
        res.status(400).send(err);
    }
});

// ADMIN ROUTE: Approve/Reject leave (Only Admins)
// Notice we pass BOTH middleware functions
router.put('/approve/:id', verifyToken, isAdmin, async (req, res) => {
    try {
        const leave = await Leave.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status }, // e.g., "Approved" or "Rejected"
            { new: true }
        );
        res.json(leave);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;