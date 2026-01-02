import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { useAuth } from './hooks/useAuth';

import Login from './pages/Login';
import ClientDashboard from './pages/ClientDashboard';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';

// Route protégée
const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

const AppRoutes = () => {
    const { user } = useAuth();

    return (
        <Routes>
            <Route
                path="/login"
                element={user ? <Navigate to="/" replace /> : <Login />}
            />

            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        {user?.role === 'CLIENT' ? <ClientDashboard /> : <AdminDashboard />}
                    </ProtectedRoute>
                }
            />

            <Route
                path="/client/dashboard"
                element={
                    <ProtectedRoute allowedRoles={['CLIENT']}>
                        <ClientDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/dashboard"
                element={
                    <ProtectedRoute allowedRoles={['ADMIN', 'AGENT']}>
                        <AdminDashboard />
                    </ProtectedRoute>
                }
            />

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <NotificationProvider>
                    <AppRoutes />
                </NotificationProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;