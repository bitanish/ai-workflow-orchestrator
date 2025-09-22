import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import CreateWorkflowPage from "./pages/CreateWorkflowPage";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<PrivateRoute>
              <DashboardPage/>
            </PrivateRoute>
        }/>
        <Route path="/workflows/create" element={
          <PrivateRoute>
            <CreateWorkflowPage/>
          </PrivateRoute>
        }> 
        </Route>
      </Routes>
    </Router>
  );
}

export default App;