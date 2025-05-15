import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';

// Protected route component
const ProtectedRoute: React.FC<{ 
  element: React.ReactElement;
  requiredUserType?: 'patient' | 'doctor';
}> = ({ element, requiredUserType }) => {
  const { authState } = useAuth();
  
  if (!authState.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredUserType && authState.user?.userType !== requiredUserType) {
    return <Navigate to={`/${authState.user?.userType}-dashboard`} replace />;
  }
  
  return element;
};

// App component
const AppContent: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route 
          path="/patient-dashboard" 
          element={
            <ProtectedRoute 
              element={<PatientDashboard />} 
              requiredUserType="patient"
            />
          } 
        />
        <Route 
          path="/doctor-dashboard" 
          element={
            <ProtectedRoute 
              element={<DoctorDashboard />} 
              requiredUserType="doctor"
            />
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

// Root App component with AuthProvider
const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;