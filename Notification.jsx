import React, { useState } from 'react';

// Error Boundary Component
class NotificationErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-100 rounded-lg">
          <h2 className="text-xl font-semibold text-red-800 mb-4">Error in Notifications</h2>
          <p className="text-red-600">An error occurred: {this.state.error?.message || 'Unknown error'}</p>
          <p className="text-gray-600 mt-2">Please try refreshing the page or contact support.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

function Notifications({ addNotification, notifications = [] }) {
  const [message, setMessage] = useState('');
  const [recipient, setRecipient] = useState('');

  const handleSendNotification = (e) => {
    e.preventDefault();
    if (!message.trim() || !recipient) {
      if (addNotification) {
        addNotification('Error: Message and recipient are required');
      }
      return;
    }
    console.log('Sending notification:', { recipient, message });
    if (addNotification) {
      addNotification(`Notification sent to ${recipient}: ${message}`);
    }
    setMessage('');
    setRecipient('');
  };

  return (
    <NotificationErrorBoundary>
      <div className="p-6 min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Notification System</h1>
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Send Notification</h2>
          <form onSubmit={handleSendNotification}>
            <div className="mb-4">
              <label className="block text-gray-600 mb-1">Recipient</label>
              <select
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Recipient</option>
                <option value="All Responders">All Responders</option>
                <option value="All Users">All Users</option>
                <option value="U123">User: Jane Doe (U123)</option>
                <option value="U456">User: Volunteer John (U456)</option>
                <option value="R001">Responder: Police Unit 1 (R001)</option>
                <option value="R002">Responder: Volunteer Jane (R002)</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-1">Message</label>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter notification message (e.g., Help dispatched)"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              <i className="fas fa-paper-plane mr-2"></i>Send
            </button>
          </form>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Received Notifications</h2>
          {notifications.length === 0 ? (
            <p className="text-gray-600">No notifications received.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {notifications.map(notification => (
                <li key={notification.id} className="py-3">
                  {notification.message}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </NotificationErrorBoundary>
  );
}

export default Notifications;