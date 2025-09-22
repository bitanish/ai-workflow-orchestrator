// // src/pages/CreateWorkflowPage.jsx
import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Chip,
  OutlinedInput,
  Alert
} from "@mui/material";
import api from '../utils/api';
import { useNavigate } from "react-router-dom";

const agentOptions = ["Researcher", "Summarizer", "Reviewer"];

const CreateWorkflowPage = () => {
  const [workflowName, setWorkflowName] = useState("");
  const [agents, setAgents] = useState([]);
  const [executionOrder, setExecutionOrder] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newWorkflow = {
      name: workflowName,
      agents,
      execution_order: executionOrder.split(",").map((a) => a.trim()),
    };

    try {
      const token = localStorage.getItem("token");
      const response = await api.post("/workflows/create", newWorkflow, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Workflow created successfully!");
      setWorkflowName("");
      setAgents([]);
      setExecutionOrder("");
      navigate("/dashboard");
    } catch (err) {
      setMessage(err.response?.data?.detail || "Error creating workflow");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ display:"flex", flexDirection: "column", minWidth: "100vw", minHeight: "100vh", justifyContent: "center", alignItems: "center" }}>
      <Typography variant="h5" gutterBottom>
        Create Workflow
      </Typography>

      {message && (
        <Alert severity="info" sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}


      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
          label="Workflow Name"
          fullWidth
          margin="normal"
          value={workflowName}
          onChange={(e) => setWorkflowName(e.target.value)}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Agents</InputLabel>
          <Select
            multiple
            value={agents}
            onChange={(e) => setAgents(e.target.value)}
            input={<OutlinedInput label="Agents" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {agentOptions.map((agent) => (
              <MenuItem key={agent} value={agent}>
                {agent}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Execution Order (comma separated)"
          fullWidth
          margin="normal"
          value={executionOrder}
          onChange={(e) => setExecutionOrder(e.target.value)}
          placeholder="e.g., Researcher, Summarizer, Reviewer"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
        >
          Save Workflow
        </Button>
      </Box>
    </Container>
  );
};

export default CreateWorkflowPage;
