import React, { useState } from 'react';

// Error Boundary Component
class LoginErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-100 rounded-lg">
          <h2 className="text-xl font-semibold text-red-800 mb-4">Error in Login</h2>
          <p className="text-red-600">An error occurred: {this.state.error?.message || 'Unknown error'}</p>
          <p className="text-gray-600 mt-2">Please try refreshing the page or contact support.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

function Login({ addNotification, onLogin }) {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!credentials.email || !validateEmail(credentials.email)) {
      newErrors.email = 'Valid email required';
    }
    if (!credentials.password || credentials.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      if (addNotification) {
        addNotification('Error: Please correct invalid fields');
      }
      return;
    }
    // Simulate login (replace with API call in production)
    console.log('Logging in:', credentials);
    if (addNotification) {
      addNotification('Login successful');
    }
    setIsLoggedIn(true);
    if (onLogin) {
      onLogin(credentials.email);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  if (isLoggedIn) {
    return (
      <div className="p-6 min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Welcome, {credentials.email}!</h2>
          <p className="text-gray-600">You are logged in. Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <LoginErrorBoundary>
      <div className="p-6 min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-600 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleInputChange}
                placeholder="e.g., admin@example.com"
                className={`w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                required
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className={`w-full p-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                required
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              <i className="fas fa-sign-in-alt mr-2"></i>Login
            </button>
          </form>
        </div>
      </div>
    </LoginErrorBoundary>
  );
}

export default Login;