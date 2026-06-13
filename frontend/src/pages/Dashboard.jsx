import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
    const navigate = useNavigate();

    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div style={{ padding: "30px" }}>
            <h1>Dashboard</h1>

            <h2>Welcome, {user?.name}</h2>

            <p>Email: {user?.email}</p>

            <p>Role: {user?.role}</p>

            <button
                onClick={() => navigate("/projects")}
            >
                View Projects
            </button>

            <br />
            <br />

            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}