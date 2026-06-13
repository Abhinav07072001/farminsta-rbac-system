const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
    getProjects,
    createProject,
    updateProject,
    deleteProject,
} = require("../controllers/projectController");

// GET /api/projects
router.get(
    "/",
    authenticate,
    authorize("USER", "MANAGER", "ADMIN"),
    getProjects
);

// POST /api/projects
router.post(
    "/",
    authenticate,
    authorize("MANAGER", "ADMIN"),
    createProject
);

// PUT /api/projects/:id
router.put(
    "/:id",
    authenticate,
    authorize("MANAGER", "ADMIN"),
    updateProject
);

// DELETE /api/projects/:id
router.delete(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    deleteProject
);

module.exports = router;