import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Projects() {
    const { user } = useAuth();

    const [projects, setProjects] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const token = localStorage.getItem("accessToken");

    const fetchProjects = async () => {
        try {
            const response = await api.get("/projects", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setProjects(response.data.data);
        } catch (error) {
            console.error(error);
            alert("Failed to load projects");
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const createProject = async () => {
        try {
            await api.post(
                "/projects",
                {
                    title,
                    description,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setTitle("");
            setDescription("");

            fetchProjects();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to create project"
            );
        }
    };

    const deleteProject = async (id) => {
        try {
            await api.delete(`/projects/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            fetchProjects();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to delete project"
            );
        }
    };

    return (
        <div style={{ padding: "30px" }}>
            <h1>Projects</h1>

            <p>
                Logged in as: <b>{user?.role}</b>
            </p>

            {(user?.role === "MANAGER" ||
                user?.role === "ADMIN") && (
                <>
                    <h3>Create Project</h3>

                    <input
                        placeholder="Title"
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                    />

                    <br />
                    <br />

                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                    />

                    <br />
                    <br />

                    <button onClick={createProject}>
                        Create
                    </button>

                    <hr />
                </>
            )}

            <h3>All Projects</h3>

            {projects.map((project) => (
                <div
                    key={project._id}
                    style={{
                        border: "1px solid black",
                        padding: "10px",
                        marginBottom: "10px",
                    }}
                >
                    <h4>{project.title}</h4>

                    <p>{project.description}</p>

                    <p>
                        Owner:{" "}
                        {project.owner?.name ||
                            "Unknown"}
                    </p>

                    {user?.role === "ADMIN" && (
                        <button
                            onClick={() =>
                                deleteProject(
                                    project._id
                                )
                            }
                        >
                            Delete
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
}