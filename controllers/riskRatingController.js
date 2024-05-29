// riskRatingController.js
const riskRatingModel = require('../models/riskRatingModel');

exports.getRiskRating = (req, res) => {
    try {
        const riskRating = riskRatingModel.getRiskRating(req.body.claimHistory);
        res.json({ risk_rating: riskRating });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
