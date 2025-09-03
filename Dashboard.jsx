import { useState } from 'react';

function Dashboard() {
  const [showAddResponder, setShowAddResponder] = useState(false);
  const [showAssignResponder, setShowAssignResponder] = useState(false);

  // Updated stats to reflect emergency app metrics
  const stats = [
    { title: 'Active Alerts', value: 5, icon: 'fas fa-exclamation-circle', color: 'bg-red-500' },
    { title: 'Resolved Alerts', value: 120, icon: 'fas fa-check-circle', color: 'bg-green-500' },
    { title: 'Registered Users', value: 1000, icon: 'fas fa-users', color: 'bg-blue-500' },
    { title: 'Available Responders', value: 30, icon: 'fas fa-user-shield', color: 'bg-purple-500' },
    { title: 'Average Response Time', value: '2 min', icon: 'fas fa-clock', color: 'bg-yellow-500' },
    { title: 'High-Risk Areas', value: 3, icon: 'fas fa-map-marker-alt', color: 'bg-orange-500' },
  ];

  // Updated activities to reflect emergency alerts
  const activities = [
    { user: 'User #123', date: '30 Aug 2025', location: 'Downtown', status: 'Responder Assigned', color: 'text-green-500' },
    { user: 'User #456', date: '29 Aug 2025', location: 'Suburb', status: 'Resolved', color: 'text-blue-500' },
  ];

  // Modified export function for alert reports
  const handleExportReport = () => {
    console.log('Exporting alert report as CSV...');
    const csv = 'User ID,Date,Location,Status\nUser #123,30 Aug 2025,Downtown,Responder Assigned\nUser #456,29 Aug 2025,Suburb,Resolved';
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'alert_report.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Modified to add responders (e.g., police, volunteers)
  const handleAddResponder = (e) => {
    e.preventDefault();
    console.log('Adding responder:', e.target.responderName.value, e.target.responderType.value);
    setShowAddResponder(false);
  };

  // Modified to assign responders to alerts
  const handleAssignResponder = (e) => {
    e.preventDefault();
    console.log('Assigning responder:', e.target.responder.value, e.target.alertId.value);
    setShowAssignResponder(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Emergency Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300"
          >
            <div className="flex items-center space-x-4">
              <div className={`${stat.color} p-3 rounded-full text-white`}>
                <i className={`${stat.icon} text-xl`}></i>
              </div>
              <div>
                <h3 className="text-gray-600 text-sm uppercase">{stat.title}</h3>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4 mb-8">
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          onClick={() => setShowAddResponder(true)}
        >
          <i className="fas fa-plus mr-2"></i>Add Responder
        </button>
        <button
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300"
          onClick={handleExportReport}
        >
          <i className="fas fa-file-export mr-2"></i>Export Alert Report
        </button>
        <button
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition duration-300"
          onClick={() => setShowAssignResponder(true)}
        >
          <i className="fas fa-user-check mr-2"></i>Assign Responder
        </button>
      </div>

      {/* Map Placeholder */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Alert Locations</h2>
        <div className="h-64 bg-gray-100 flex items-center justify-center">
          <p className="text-gray-500">Map Integration (e.g., Google Maps or Leaflet) for Real-Time Alert Locations</p>
        </div>
      </div>

      {/* Latest Activity */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Alerts</h2>
        <ul className="divide-y divide-gray-200">
          {activities.map((activity, index) => (
            <li key={index} className="py-3 flex justify-between items-center">
              <span>
                {activity.user} – {activity.date} – {activity.location}
              </span>
              <span className={`font-medium ${activity.color}`}>{activity.status}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Add Responder Modal */}
      {showAddResponder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Responder</h2>
            <form onSubmit={handleAddResponder}>
              <div className="mb-4">
                <input
                  type="text"
                  name="responderName"
                  placeholder="Responder Name"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
                <select
                  name="responderType"
                  className="w-full p-2 border border-gray-300 rounded-lg mt-2"
                  required
                >
                  <option value="">Select Responder Type</option>
                  <option value="Police">Police</option>
                  <option value="Ambulance">Ambulance</option>
                  <option value="Volunteer">Volunteer</option>
                  <option value="NGO">NGO</option>
                </select>
                <input
                  type="email"
                  name="responderEmail"
                  placeholder="Responder Email"
                  className="w-full p-2 border border-gray-300 rounded-lg mt-2"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-300"
                  onClick={() => setShowAddResponder(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Add Responder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assign Responder Modal */}
      {showAssignResponder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Assign Responder to Alert</h2>
            <form onSubmit={handleAssignResponder}>
              <div className="mb-4">
                <input
                  type="text"
                  name="alertId"
                  placeholder="Alert ID (e.g., #123)"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
                <select
                  name="responder"
                  className="w-full p-2 border border-gray-300 rounded-lg mt-2"
                  required
                >
                  <option value="">Select Responder</option>
                  <option value="Police Unit 1">Police Unit 1</option>
                  <option value="Ambulance A">Ambulance A</option>
                  <option value="Volunteer Jane">Volunteer Jane</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-300"
                  onClick={() => setShowAssignResponder(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Assign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;