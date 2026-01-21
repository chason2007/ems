const jwt = require('jsonwebtoken');

// 1. Verify Token (Authentication)
// Checks if the user has a valid token in the header
const verifyToken = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied: No Token Provided');

    try {
        // "verified" will contain the user's ID and Role payload
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Attach user info to the request object
        next(); // Move to the next function
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
};

// 2. Check Admin Role (Authorization)
// Checks if the user attached to the request is an Admin
const isAdmin = (req, res, next) => {
    // We assume req.user is already set by verifyToken above
    if (req.user.role !== 'Admin') {
        return res.status(403).send('Access Denied: You do not have permission');
    }
    next();
};

module.exports = { verifyToken, isAdmin };