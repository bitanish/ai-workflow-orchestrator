import React, { useEffect, useState } from "react";
import {
	Button,
	Container,
	Typography,
	Box,
	List,
	ListItem,
	ListItemText,
	Paper,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const DashboardPage = () => {
	const navigate = useNavigate();
	const [workflows, setWorkflows] = useState([]);
	const [selectedWorkflow, setSelectedWorkflow] = useState(null);
	const [topic, setTopic] = useState("");
	const [result, setResult] = useState(null);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const fetchWorkflows = async () => {
			try {
				const token = localStorage.getItem("token");
				const response = await api.get("/workflows/list", {
					headers: { Authorization: `Bearer ${token}` },
				});
				setWorkflows(response.data.workflows);
			} catch (err) {
				console.error("Error fetching workflows:", err);
			}
		};

		fetchWorkflows();
	}, []);

	const handleRunWorkflow = async () => {
		if (!selectedWorkflow) return;
			try {
				const token = localStorage.getItem("token");
				const response = await api.post(
					`/workflows/run/${encodeURIComponent(selectedWorkflow.name)}?topic=${encodeURIComponent(topic)}`,
					{},
					{ headers: { Authorization: `Bearer ${token}` } }
				);
				setResult(response.data.result);
			} catch (err) {
				console.error("Error running workflow:", err);
				setResult("Error running workflow.");
			}
		setOpen(false);
	};

  return (
		<Container sx={{ mt: 8, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh",minWidth: "100vw"}}>		
			<Box textAlign="center" sx={{ mb: 4 }}>
				<Typography variant="h4" gutterBottom>
					Dashboard
				</Typography>
				<Typography variant="body1">
					Welcome! Manage and run your workflows here.
				</Typography>
			</Box>

			<Box textAlign="center" sx={{ mb: 4 }}>
				<Button
					variant="contained"
					color="primary"
					onClick={() => navigate("/workflows/create")}
				>
					Create Workflow
				</Button>
			</Box>

			<Paper elevation={3} sx={{ p: 2, mb: 4, borderRadius: 2, backgroundColor: "#fafafa", width: "40%" }}>
				<Typography variant="h6" sx={{textAlign: "center"}} gutterBottom>
					Your Workflows
				</Typography>
				{workflows.length === 0 ? (
					<Typography sx={{textAlign: "center"}}>No workflows created yet.</Typography>
				) : (
					<List>
						{workflows.map((wf, index) => (
							<ListItem key={index} divider>
								<ListItemText primary={wf.name} secondary={`Agents: ${wf.agents.join(", ")} | Order: ${wf.execution_order.join(" -> ")}`} />								
								<Button variant="outlined" size="small" onClick={() => {setSelectedWorkflow(wf);setOpen(true);}}>
									Run
								</Button>
							</ListItem>
						))}
					</List>
				)}
			</Paper>

			{result && (
			<Paper elevation={4} sx={{p: 3, mb: 4, borderRadius: 2, backgroundColor: "#f9f9f9", width: "80%", maxWidth: "900px", }}>
				<Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", mb: 2 }}>
				Workflow Result
				</Typography>

				{result && (
					<Paper elevation={4} sx={{p: 3, mb: 4, borderRadius: 2, backgroundColor: "#fafafa", width: "80%", maxWidth: "900px",}}>
						<Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", mb: 2 }}>
							Workflow Result
						</Typography>

						{result.raw && (
							<Box sx={{ mb: 3 }}>
								<Typography variant="subtitle1" fontWeight="bold">
									Final Summary
								</Typography>
								<Paper elevation={1} sx={{p: 2, mt: 1, borderRadius: 2, backgroundColor: "#f5f5f5", whiteSpace: "pre-wrap",}}>				
									{result.raw}
								</Paper>
							</Box>
						)}

						{result?.tasks_output &&
						result.tasks_output.map((task, idx) => (
							<Paper key={idx} elevation={2} sx={{p: 2,mb: 2,borderRadius: 2,backgroundColor: "#fff",border: "1px solid #e0e0e0",}}>			
								<Typography variant="subtitle1" fontWeight="bold">
									{task.agent} Output
								</Typography>

								{task.summary && (
									<Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 1 }}>
										{task.summary}
									</Typography>
								)}

								{task.raw && (
									<Box sx={{backgroundColor: "#1e1e1e", color: "#f5f5f5", p: 2, borderRadius: 2, fontFamily: "monospace", fontSize: "0.85rem", whiteSpace: "pre-wrap", wordBreak: "break-word", maxHeight: "300px", overflowY: "auto",}}>
										{task.raw}
									</Box>
								)}
							</Paper>
						))}
					</Paper>
				)}
			</Paper>
			)}

			<Dialog open={open} onClose={() => setOpen(false)} PaperProps={{sx: { borderRadius: 3, p: 2, minWidth: 400 }}}>
				<DialogTitle sx={{ fontWeight: "bold", mb: 1 }}>
					Run Workflow
				</DialogTitle>

				<DialogContent dividers sx={{ pt: 3 }}>
					<TextField autoFocus margin="dense" label="Enter Topic" type="text" fullWidth variant="outlined" size="medium" value={topic} onChange={(e) => setTopic(e.target.value)} sx={{ borderRadius: 2 }} />
				</DialogContent>

				<DialogActions sx={{ px: 3, pb: 2 }}>
					<Button onClick={() => setOpen(false)} variant="outlined" color="secondary" sx={{ borderRadius: 2 }}>
						Cancel
					</Button>
					<Button variant="contained" onClick={handleRunWorkflow} sx={{ borderRadius: 2, px: 3 }}>
						Run
					</Button>
				</DialogActions>
			</Dialog>
		</Container>
  	);
};

export default DashboardPage;
