import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided" });
        }

        const token = authHeader.split(" ")[1];
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decodedData.id;
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
    }
};

export default auth;

