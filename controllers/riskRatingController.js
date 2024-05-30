// riskRatingController.js
const riskRatingModel = require('../models/riskRatingModel');

exports.getRiskRating = (req, res) => {
    try {
        const riskRating = riskRatingModel.getRiskRating(req.body.claimHistory);
        res.json({ risk_rating: riskRating });
    } catch (error) {
        res.status(400).json({ error: "Invalid input: claim history is required and must be a non-empty string." });
    }
};
