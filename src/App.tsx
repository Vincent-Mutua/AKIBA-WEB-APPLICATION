import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing-page";
import Register from "./pages/register";
import PasswordReset from "./pages/reset-password";
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard/Dashboard";
import UploadStatement from './pages/UploadStatement/UploadStatement';
import Balances from "./pages/Balances/Balances";
import Transactions from "./pages/Transactions/Transactions";
import Bills from "./pages/Bills/Bills";
import Expenses from "./pages/Expenses/Expenses";
import Profile from "./pages/Profile/userprofile";
import Goals from "./pages/Goals/Goals.jsx";
import Admin from "./Admin/Admin.jsx";
import Statistics from "./pages/Statistics/Statistics";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<PasswordReset />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/upload-statement" element={<UploadStatement />} />
        <Route path="/balances" element={<Balances />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/bills" element={<Bills />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/user-profile" element={<Profile />} />
        <Route path="/goals" element={<Goals/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/statistics" element={<Statistics/>}/>
        {/* Default route */}
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
