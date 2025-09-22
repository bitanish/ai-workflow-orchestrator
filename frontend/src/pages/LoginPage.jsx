import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import api from '../utils/api';
import { replace, useNavigate } from "react-router-dom";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try{
            const response = await api.post("/auth/login", {
                username,
                password,
            });

            // Save JWT in localStorage
            localStorage.setItem("token", response.data.access_token);
            navigate("/dashboard", {"replace": true});
        } catch (err) {
            setError("Invalid username or password");
            setUsername("");
            setPassword("");
        }
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minWidth="100vw" minHeight="100vh" bgcolor="#f5f5f5">
            <Paper elevation={3} sx={{ p: 4, width: 400, borderRadius: 3 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    AI Workflow Orchestrator Login
                </Typography>

                <TextField
                fullWidth
                label="Username"
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />

                <TextField
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />

                {error && (
                    <Typography color="error" variant="body2">
                        {error}
                    </Typography>
                )}

                <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={handleLogin}
                >
                    Login
                </Button>
            </Paper>
        </Box>
    );
};

export default LoginPage;