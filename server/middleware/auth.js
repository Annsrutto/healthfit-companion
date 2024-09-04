import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded.id });

        if (!user) {
            throw new Error('User not found');
        }

        req.user = user; // Attach the user to req
        req.userId = user._id; // Optionally attach the user ID separately
        next();
    } catch (error) {
        res.status(401).json({ message: 'Please authenticate' });
    }
};

export default auth;


