import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import UserManagement from './pages/UserManagement';
import EmergencyAlerts from './pages/alert';
import ResponderManagement from './pages/responder';
import Notifications from './pages/Notification';
import Login from './pages/Login';
import './index.css';

// PrivateRoute component to protect routes
function PrivateRoute({ children, isAuthenticated }) {
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message) => {
    setNotifications([...notifications, { id: Date.now(), message }]);
  };

  const handleLogin = (email) => {
    setUser(email);
    addNotification('Login successful');
  };

  const handleLogout = () => {
    setUser(null);
    addNotification('Logged out successfully');
  };

  return (
    <div className="app-container">
      {user && (
        <>
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} handleLogout={handleLogout} />
          <div className={`main-content ${isOpen ? 'main-content-open' : 'main-content-collapsed'}`}>
            <Navbar user={user} />
            <main className="content">
              <Routes>
                <Route
                  path="/"
                  element={
                    <PrivateRoute isAuthenticated={!!user}>
                      <Dashboard addNotification={addNotification} />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/reports"
                  element={
                    <PrivateRoute isAuthenticated={!!user}>
                      <Reports addNotification={addNotification} />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <PrivateRoute isAuthenticated={!!user}>
                      <Settings addNotification={addNotification} />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/UserManagement"
                  element={
                    <PrivateRoute isAuthenticated={!!user}>
                      <UserManagement addNotification={addNotification} />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/alert"
                  element={
                    <PrivateRoute isAuthenticated={!!user}>
                      <EmergencyAlerts addNotification={addNotification} />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/responder"
                  element={
                    <PrivateRoute isAuthenticated={!!user}>
                      <ResponderManagement addNotification={addNotification} />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/Notification"
                  element={
                    <PrivateRoute isAuthenticated={!!user}>
                      <Notifications addNotification={addNotification} notifications={notifications} />
                    </PrivateRoute>
                  }
                /> 
                <Route
                  path="/login"
                  element={
                    user ? <Navigate to="/" /> : <Login addNotification={addNotification} onLogin={handleLogin} />
                  }
                />
                <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
              </Routes>
            </main>
          </div>
        </>
      )}
      {!user && (   
        <Routes>
          <Route path="/login" element={<Login addNotification={addNotification} onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </div>
  );
}

export default App;