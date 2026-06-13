import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const navigate = useNavigate();

    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await api.post(
            "/auth/login",
            formData
        );

        login(
            response.data.user,
            response.data.accessToken,
            response.data.refreshToken
        );

        navigate("/dashboard");
    } catch (error) {
        alert(
            error.response?.data?.message ||
            "Login failed"
        );
    }
};

    return (
        <div style={{ padding: "30px" }}>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <br />

                <div>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <br />

                <button type="submit">
                    Login
                </button>
            </form>

            <br />

            <Link to="/register">
                Don't have an account? Register
            </Link>
        </div>
    );
}