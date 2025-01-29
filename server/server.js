import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import exerciseRoutes from './routes/exercises.js';
import goalRoutes from './routes/goals.js';
import connectDB from './config/db.js';
import errorHandler from './middleware/error.js';
import africastalking from 'africastalking';

dotenv.config();

const app = express();

// Middleware setup and error handling
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
	origin: process.env.CLIENT_URL || 'http://localhost:3000',
	methods: 'GET,POST,PUT,DELETE',
	allowedHeaders: 'Content-Type,Authorization'
  }));
app.use(errorHandler);

// Default route
app.get('/api', async(req, res) => {
	res.status(200).json({
		message: 'Welcome to the AfyaFit API',
	});
  });

// Route setup
app.use('/api/auth', authRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/goals', goalRoutes);

// Initialize Africa's Talking SDK with your API Key
africastalking.initialize(process.env.AFRICASTALKING_USERNAME, process.env.AFRICASTALKING_API_KEY);
const sms = africastalking.SMS;

// USSD route to handle requests
app.post('/ussd', (req, res) => {
    const { sessionId, serviceCode, phoneNumber, text } = req.body;
    let response = "";

    // Handling USSD logic based on user input
    if (text === "") {
        response = "CON Welcome to AfyaFit! Choose an option:\n1. View Workout Plans\n2. Nutrition Tips\n3. Track Progress";
    } else if (text === "1") {
        response = "CON Choose your workout goal:\n1. Weight Loss\n2. Muscle Gain\n3. General Fitness";
    } else if (text === "1*1") {
        response = "END Your Weight Loss workout plan is being sent to your phone!";
        // Send SMS for workout plan
        sms.send({
            to: phoneNumber,
            message: "Your Weight Loss workout plan is here! Stay committed!",
            enqueue: true
        });
    } else if (text === "2") {
        response = "CON Select Nutrition Plan:\n1. Weight Loss Diet\n2. Muscle Gain Diet\n3. General Health Diet";
    } else if (text === "2*1") {
        response = "END Eat more proteins and reduce carbs for weight loss.";
        sms.send({
            to: phoneNumber,
            message: "Your Weight Loss diet plan has been sent. Stay healthy!",
            enqueue: true
        });
    } else {
        response = "END Invalid option. Please try again!";
    }

    res.set('Content-Type', 'text/plain');
    res.send(response);
});


// Database connection
connectDB();

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
