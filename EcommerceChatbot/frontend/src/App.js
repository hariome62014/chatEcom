import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
import VerifyOtp from './pages/VerifyOtp';

function App() {

  const user = useSelector((state) => state.profile.user);
    console.log("User:",user);

    return (
        <div>
            <Routes>
                {/* Public Routes */}
                {!user ? (
                    <>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/verify-email" element={<VerifyOtp />} />
                        {/* Redirect to login for unauthenticated users */}
                        <Route path="*" element={<Navigate to="/login" />} />
                    </>
                ) : (
                    <>
                        {/* Protected Routes */}
                        <Route path="/dashboard" element={<Home />} />
                        {/* Redirect to dashboard for authenticated users */}
                        <Route path="*" element={<Navigate to="/dashboard" />} />
                    </>
                )}
            </Routes>
        </div>
    );
}

export default App;
