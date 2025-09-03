import { useState } from 'react';

function EmergencyAlerts({ addNotification }) {
  const [showAssignResponder, setShowAssignResponder] = useState(null);
  const [showEvidence, setShowEvidence] = useState(null);
  const [alerts, setAlerts] = useState([
    { id: 'A001', userId: 'U123', location: 'Downtown', time: '30 Aug 2025 14:00', status: 'Pending', evidence: 'audio.mp3' },
    { id: 'A002', userId: 'U456', location: 'Suburb', time: '29 Aug 2025 09:30', status: 'Resolved', evidence: 'video.mp4' },
    { id: 'A003', userId: 'U789', location: 'City Center', time: '29 Aug 2025 15:45', status: 'Pending', evidence: 'text.txt' },
  ]);
  const responders = [
    { id: 'R001', name: 'Police Unit 1', type: 'Police' },
    { id: 'R002', name: 'Volunteer Jane', type: 'Volunteer' },
    { id: 'R003', name: 'Ambulance A', type: 'Ambulance' },
  ];

  const handleAssignResponder = (e, alertId) => {
    e.preventDefault();
    const responderId = e.target.responder.value;
    const responder = responders.find(r => r.id === responderId);
    const updatedAlerts = alerts.map(alert =>
      alert.id === alertId ? { ...alert, status: 'Responder Assigned' } : alert
    );
    setAlerts(updatedAlerts);
    console.log('Assigning responder:', responderId, 'to alert:', alertId);
    setShowAssignResponder(null);
    if (addNotification) {
      addNotification(`Responder ${responder.name} assigned to alert ${alertId}`);
    }
  };

  const handleEscalateAlert = (alertId) => {
    const updatedAlerts = alerts.map(alert =>
      alert.id === alertId ? { ...alert, status: 'Escalated' } : alert
    );
    setAlerts(updatedAlerts);
    console.log('Escalating alert:', alertId);
    if (addNotification) {
      addNotification(`Alert ${alertId} escalated to emergency services`);
    }
  };

  const handleViewEvidence = (evidence) => {
    console.log('Viewing evidence:', evidence);
    setShowEvidence(evidence);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Emergency Alerts</h1>
      <div className="bg-white p-6 rounded-xl shadow-md">
        {alerts.length === 0 ? (
          <p className="text-gray-600">No alerts available.</p>
        ) : (
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">User ID</th>
                <th className="p-3 text-left">Location</th>
                <th className="p-3 text-left">Time</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Evidence</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map(alert => (
                <tr key={alert.id} className="border-t">
                  <td className="p-3">{alert.id}</td>
                  <td className="p-3">{alert.userId}</td>
                  <td className="p-3">{alert.location}</td>
                  <td className="p-3">{alert.time}</td>
                  <td className="p-3">
                    <span className={`font-medium ${alert.status === 'Pending' ? 'text-red-500' : alert.status === 'Escalated' ? 'text-orange-500' : 'text-green-500'}`}>
                      {alert.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => handleViewEvidence(alert.evidence)}
                    >
                      View
                    </button>
                  </td>
                  <td className="p-3">
                    <button
                      className="text-purple-600 hover:underline mr-2"
                      onClick={() => setShowAssignResponder(alert.id)}
                    >
                      Assign
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleEscalateAlert(alert.id)}
                    >
                      Escalate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Assign Responder Modal */}
      {showAssignResponder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Assign Responder to Alert</h2>
            <form onSubmit={(e) => handleAssignResponder(e, showAssignResponder)}>
              <div className="mb-4">
                <label className="block text-gray-600 mb-1">Alert ID</label>
                <input
                  type="text"
                  value={showAssignResponder}
                  className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100"
                  disabled
                />
                <label className="block text-gray-600 mb-1 mt-2">Responder</label>
                <select
                  name="responder"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                >
                  <option value="">Select Responder</option>
                  {responders.map(responder => (
                    <option key={responder.id} value={responder.id}>
                      {responder.name} ({responder.type})
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-300"
                  onClick={() => setShowAssignResponder(null)}
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

      {/* Evidence Modal */}
      {showEvidence && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">View Evidence</h2>
            <div className="mb-4">
              <p className="text-gray-600">Evidence File: <span className="font-medium">{showEvidence}</span></p>
              <p className="text-gray-500 mt-2">Note: In a production environment, this would display or link to the actual audio, video, or text file securely.</p>
            </div>
            <div className="flex justify-end">
              <button
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-300"
                onClick={() => setShowEvidence(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmergencyAlerts;