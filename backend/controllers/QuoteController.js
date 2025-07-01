import Quote from "../models/QuoteModule.js";

const quotecontroller = async(req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: "Request body is missing or empty" });
        }

        const { projectType, name, email, companyName, phone, ProductBudget, productTimeline, productDescription, additionalServices } = req.body;

        if (!projectType || !name || !email || !companyName || !phone || !ProductBudget || !productTimeline || !productDescription) {
            return res.status(400).json({ error: "All required fields must be provided" });
        }

        const quote = new Quote({
            projectType,
            name,
            email,
            companyName,
            phone,
            ProductBudget,
            productTimeline,
            productDescription,
            additionalServices
        });

        await quote.save();

        res.status(201).json({
            message: "Quote created successfully",
            data: quote
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                error: "Validation failed",
                details: error.message
            });
        }
        console.error("Error creating quote:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export default quotecontroller;