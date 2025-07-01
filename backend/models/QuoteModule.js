import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
    projectType: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, match: /.+\@.+\..+/ },
    companyName: { type: String, required: true, trim: true },
    phone: { type: Number, required: true },
    ProductBudget: { type: Number, required: true },
    productTimeline: { type: String, required: true, trim: true },
    productDescription: { type: String, required: true, trim: true },
    additionalServices: { type: String, required: false, trim: true }
});

const Quote = mongoose.model("Quote", quoteSchema);
export default Quote;