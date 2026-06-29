import userModel from "../models/userModel.js";

const adminAuth = async (req, res, next) => {
    try {

        const user = await userModel.findById(req.body.userId);

        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        if (user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Admin access required"
            });
        }

        next();

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Admin verification failed"
        });
    }
}

export default adminAuth;