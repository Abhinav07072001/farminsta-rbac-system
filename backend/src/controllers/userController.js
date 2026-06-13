const User = require("../models/User");

// GET /api/users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password -refreshToken");

        return res.status(200).json({
            success: true,
            count: users.length,
            data: users,
        });
    } catch (error) {
        console.error("Get Users Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// PATCH /api/users/:id/role
const updateUserRole = async (req, res) => {
    try {
        const { role } = req.body;

        if (!["USER", "MANAGER", "ADMIN"].includes(role)) {
            return res.status(400).json({
                success: false,
                message: "Invalid role",
            });
        }

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        user.role = role;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "User role updated successfully",
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Update Role Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

module.exports = {
    getAllUsers,
    updateUserRole,
};