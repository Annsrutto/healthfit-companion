import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        // Retrieve the Authorization header
        const authHeader = req.headers.authorization;

        // Check if the Authorization header exists and starts with "Bearer "
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided" });
        }

        // Extract the token from the header
        const token = authHeader.split(" ")[1];

        // Check if the token is valid (not null/undefined)
        if (!token) {
            return res.status(401).json({ message: "Invalid token format" });
        }

        const isCustomAuth = token.length < 500;

        let decodedData;

        if (isCustomAuth) {
            // Verify token using the custom JWT secret
            decodedData = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = decodedData?.id;
        } else {
            // Decode the token (for tokens from external authentication providers like Google)
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
        }

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // Handle errors, such as token verification failure
        console.error("Authentication error:", error);
        res.status(401).json({ message: "Unauthorized" });
    }
};

export default auth;

