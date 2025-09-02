import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar({ user, handleLogout }) {
  const navigate = useNavigate();

  const onLogout = () => {
    console.log('Logout button clicked'); // Debug
    if (typeof handleLogout === 'function') {
      handleLogout(); // Call only if handleLogout is a function
    } else {
      console.warn('handleLogout is not a function'); // Debug
    }
    navigate('/login'); // Redirect to login
  };

  console.log('Navbar rendering with user:', user, 'handleLogout:', typeof handleLogout); // Debug
  return (
    <nav className="bg-white shadow-lg p-4 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <i className="fas fa-shield-alt text-blue-600 text-xl"></i>
        <div className="text-2xl font-bold text-gray-800">Admin Panel</div>
      </div>
      <div className="flex items-center space-x-6">
        <div className="relative group">
          <span className="text-gray-600 font-medium">{user || 'Admin Name'}</span>
          <div className="absolute hidden group-hover:block bg-white shadow-md rounded-md p-2 mt-2">
            <button className="text-gray-600 hover:text-blue-600">Profile</button>
          </div>
        </div>
        <button
          className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition duration-300"
          onClick={onLogout}
        >
          <i className="fas fa-sign-out-alt mr-2"></i>Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;