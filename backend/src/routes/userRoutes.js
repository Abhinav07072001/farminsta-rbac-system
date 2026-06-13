const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
    getAllUsers,
    updateUserRole,
} = require("../controllers/userController");

// ADMIN only
router.get(
    "/",
    authenticate,
    authorize("ADMIN"),
    getAllUsers
);

router.patch(
    "/:id/role",
    authenticate,
    authorize("ADMIN"),
    updateUserRole
);

module.exports = router;