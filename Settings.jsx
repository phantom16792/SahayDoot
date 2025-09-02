import React, { useState } from 'react';

function Settings({ addNotification }) {
  const [settings, setSettings] = useState({
    policeContact: '',
    fireContact: '',
    medicalContact: '',
    alertThreshold: '',
    geofencingRules: '',
  });
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!settings.policeContact || !validateEmail(settings.policeContact)) {
      newErrors.policeContact = 'Valid email required';
    }
    if (!settings.fireContact || !validateEmail(settings.fireContact)) {
      newErrors.fireContact = 'Valid email required';
    }
    if (!settings.medicalContact || !validateEmail(settings.medicalContact)) {
      newErrors.medicalContact = 'Valid email required';
    }
    if (!settings.alertThreshold || isNaN(settings.alertThreshold) || settings.alertThreshold <= 0) {
      newErrors.alertThreshold = 'Positive number required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateSettings = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      if (addNotification) {
        addNotification('Error: Please correct invalid fields');
      }
      return;
    }
    console.log('Updating settings:', settings);
    if (addNotification) {
      addNotification('Settings updated successfully');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  return (
      <div className="p-6 min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Settings and Configuration</h1>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Emergency Contacts & Settings</h2>
          <form onSubmit={handleUpdateSettings}>
            <div className="mb-4">
              <label className="block text-gray-600 mb-1">Police Contact (Email)</label>
              <input
                type="email"
                name="policeContact"
                value={settings.policeContact}
                onChange={handleInputChange}
                placeholder="e.g., police@example.com"
                className={`w-full p-2 border ${errors.policeContact ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                required
              />
              {errors.policeContact && <p className="text-red-500 text-sm mt-1">{errors.policeContact}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-1">Fire Contact (Email)</label>
              <input
                type="email"
                name="fireContact"
                value={settings.fireContact}
                onChange={handleInputChange}
                placeholder="e.g., fire@example.com"
                className={`w-full p-2 border ${errors.fireContact ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                required
              />
              {errors.fireContact && <p className="text-red-500 text-sm mt-1">{errors.fireContact}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-1">Medical Contact (Email)</label>
              <input
                type="email"
                name="medicalContact"
                value={settings.medicalContact}
                onChange={handleInputChange}
                placeholder="e.g., medical@example.com"
                className={`w-full p-2 border ${errors.medicalContact ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                required
              />
              {errors.medicalContact && <p className="text-red-500 text-sm mt-1">{errors.medicalContact}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-1">Alert Threshold (Minutes)</label>
              <input
                type="number"
                name="alertThreshold"
                value={settings.alertThreshold}
                onChange={handleInputChange}
                placeholder="e.g., 5"
                min="1"
                className={`w-full p-2 border ${errors.alertThreshold ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                required
              />
              {errors.alertThreshold && <p className="text-red-500 text-sm mt-1">{errors.alertThreshold}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-1">Geofencing Rules (JSON or Text)</label>
              <textarea
                name="geofencingRules"
                value={settings.geofencingRules}
                onChange={handleInputChange}
                placeholder='e.g., {"area": "Downtown", "radius": 500}'
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              <i className="fas fa-save mr-2"></i>Save Settings
            </button>
          </form>
        </div>
      </div>
  );
}

export default Settings;