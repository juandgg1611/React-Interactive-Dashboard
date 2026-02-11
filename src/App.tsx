import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/landing/LandingPage";
import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";
import { PasswordRecoveryFlow } from "./components/auth/recovery/PasswordRecoveryFlow";
import Dashboard from "./components/pages/Dashboard";
import Features from "./components/pages/Features";
import "./App.css";

import Budgets from "./components/pages/Budgets";
import Transactions from "./components/pages/Transactions";
import SavingsGoals from "./components/pages/SavingsGoals";
import Analytics from "./components/pages/Analytics";
import Help from "./components/pages/Help";
import Notifications from "./components/pages/Notifications";
import Calculator from "./components/pages/Calculator";
import Calendar from "./components/pages/CalendarPage";
import Profile from "./components/pages/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/recover-password" element={<PasswordRecoveryFlow />} />
        <Route path="/dashboard" element={<Dashboard />} />{" "}
        <Route path="/features" element={<Features />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/budgets" element={<Budgets />} />
        <Route path="/savings-goals" element={<SavingsGoals />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/help" element={<Help />} />
      </Routes>
    </Router>
  );
}

export default App;
