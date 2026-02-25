import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import UserPortal from './pages/UserPortal';
import { ResourceProvider } from './context/ResourceContext';

function App() {
    return (
        <ResourceProvider>
            <Router>
                <div className="app-container">
                    <Routes>
                        <Route path="/" element={<Navigate to="/login" replace />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/admin" element={<AdminDashboard />} />
                        <Route path="/user" element={<UserPortal />} />
                    </Routes>
                </div>
            </Router>
        </ResourceProvider>
    );
}

export default App;
