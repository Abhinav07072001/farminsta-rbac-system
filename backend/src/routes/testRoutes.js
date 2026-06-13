const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

router.get(
    "/profile",
    authenticate,
    (req, res) => {
        res.status(200).json({
            success: true,
            user: req.user,
        });
    }
);

router.get(
    "/admin",
    authenticate,
    authorize("ADMIN"),
    (req, res) => {
        res.status(200).json({
            success: true,
            message: "Welcome Admin",
        });
    }
);

module.exports = router;