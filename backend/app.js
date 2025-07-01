import express from "express";
import mongoose from "mongoose";
import quoteRouter from "./routes/quote.js";
import cors from "cors";

const app = express();

// Middleware
app.use(cors({
    origin: "http://localhost:5173", // Allow Vite frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debug middleware to log request headers and body
app.use((req, res, next) => {
    console.log("Request Headers:", req.headers);
    console.log("Request Body:", req.body);
    next();
});

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/quoteDB", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Mount router
app.use("/", quoteRouter); // http://localhost:3000/quote

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});

// Start server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}).on("error", (err) => {
    console.error("Server failed to start:", err);
});