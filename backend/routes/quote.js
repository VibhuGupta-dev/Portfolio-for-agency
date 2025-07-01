import { Router } from "express";
import quotecontroller from "../controllers/QuoteController.js";

const router = Router();

router.get("/", (req, res) => {
    res.send("hey");
});
router.post("/quote", quotecontroller);

export default router;