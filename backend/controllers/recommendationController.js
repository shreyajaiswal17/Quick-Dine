import recommendationService from "../services/recommendationService.js";

const getRecommendations = async (req, res) => {
    try {
        const { userId } = req.body;

        const result = await recommendationService.getRecommendationsForUser(
            userId
        );

        return res.json({
            success: true,
            personalized: result.personalized,
            recommendations: result.recommendations,
        });
    } catch (error) {
        console.log("Recommendation controller error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to load recommendations",
        });
    }
};

export { getRecommendations };