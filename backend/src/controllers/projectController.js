const Project = require("../models/Project");

// GET /projects
const getProjects = async (req, res) => {
    try {
        const projects = await Project.find()
            .populate("owner", "name email role");

        return res.status(200).json({
            success: true,
            count: projects.length,
            data: projects,
        });
    } catch (error) {
        console.error("Get Projects Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// POST /projects
const createProject = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Title is required",
            });
        }

        const project = await Project.create({
            title,
            description,
            owner: req.user.id,
        });

        return res.status(201).json({
            success: true,
            message: "Project created successfully",
            data: project,
        });
    } catch (error) {
        console.error("Create Project Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// PUT /projects/:id
const updateProject = async (req, res) => {
    try {
        const { title, description } = req.body;

        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }

        // ADMIN can update any project
        if (req.user.role !== "ADMIN") {
            // MANAGER can only update own project
            if (project.owner.toString() !== req.user.id) {
                return res.status(403).json({
                    success: false,
                    message: "Forbidden",
                });
            }
        }

        if (title) {
            project.title = title;
        }

        if (description !== undefined) {
            project.description = description;
        }

        await project.save();

        return res.status(200).json({
            success: true,
            message: "Project updated successfully",
            data: project,
        });
    } catch (error) {
        console.error("Update Project Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// DELETE /projects/:id
const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }

        await project.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Project deleted successfully",
        });
    } catch (error) {
        console.error("Delete Project Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

module.exports = {
    getProjects,
    createProject,
    updateProject,
    deleteProject,
};