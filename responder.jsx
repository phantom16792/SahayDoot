import { useState } from 'react';

function ResponderManagement({ addNotification }) {
  const [showAddResponder, setShowAddResponder] = useState(false);
  const [showActions, setShowActions] = useState(null);
  const [responders, setResponders] = useState([
    {
      id: 'R001',
      name: 'Police Unit 1',
      type: 'Police',
      location: 'City Center',
      availability: 'Available',
      actions: ['Responded to A001 at 30 Aug 2025 14:10'],
      responseTime: '2 min',
    },
    {
      id: 'R002',
      name: 'Volunteer Jane',
      type: 'Volunteer',
      location: 'Suburb',
      availability: 'Busy',
      actions: ['Responded to A002 at 29 Aug 2025 09:40'],
      responseTime: '3 min',
    },
    {
      id: 'R003',
      name: 'NGO Support',
      type: 'NGO',
      location: 'Downtown',
      availability: 'Available',
      actions: [],
      responseTime: 'N/A',
    },
  ]);

  const handleAddResponder = (e) => {
    e.preventDefault();
    const newResponder = {
      id: `R${Math.floor(Math.random() * 1000)}`,
      name: e.target.name.value,
      type: e.target.type.value,
      location: e.target.location.value,
      availability: 'Available',
      actions: [],
      responseTime: 'N/A',
    };
    setResponders([...responders, newResponder]);
    console.log('Adding responder:', newResponder);
    setShowAddResponder(false);
    if (addNotification) {
      addNotification(`Responder ${newResponder.name} added successfully`);
    }
  };

  const handleViewActions = (responderId) => {
    console.log('Viewing actions for responder:', responderId);
    setShowActions(responderId);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Responder Management</h1>
      <button
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 mb-6"
        onClick={() => setShowAddResponder(true)}
      >
        <i className="fas fa-plus mr-2"></i>Add Responder
      </button>
      <div className="bg-white p-6 rounded-xl shadow-md">
        {responders.length === 0 ? (
          <p className="text-gray-600">No responders available.</p>
        ) : (
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Location</th>
                <th className="p-3 text-left">Availability</th>
                <th className="p-3 text-left">Response Time</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {responders.map(responder => (
                <tr key={responder.id} className="border-t">
                  <td className="p-3">{responder.id}</td>
                  <td className="p-3">{responder.name}</td>
                  <td className="p-3">{responder.type}</td>
                  <td className="p-3">{responder.location}</td>
                  <td className="p-3">
                    <span
                      className={`font-medium ${
                        responder.availability === 'Available' ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {responder.availability}
                    </span>
                  </td>
                  <td className="p-3">{responder.responseTime}</td>
                  <td className="p-3">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => handleViewActions(responder.id)}
                    >
                      View Actions ({responder.actions.length})
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Responder Modal */}
      {showAddResponder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Responder</h2>
            <form onSubmit={handleAddResponder}>
              <div className="mb-4">
                <label className="block text-gray-600 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter name"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
                <label className="block text-gray-600 mb-1 mt-2">Type</label>
                <select
                  name="type"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="Police">Police</option>
                  <option value="Volunteer">Volunteer</option>
                  <option value="NGO">NGO</option>
                  <option value="Ambulance">Ambulance</option>
                </select>
                <label className="block text-gray-600 mb-1 mt-2">Location</label>
                <input
                  type="text"
                  name="location"
                  placeholder="Enter location"
                  className="w-full p-2 border border-gray-300 rounded-lg"
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

      {/* View Actions Modal */}
      {showActions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Responder Actions</h2>
            <div className="mb-4">
              <p className="text-gray-600">
                Actions for Responder:{' '}
                <span className="font-medium">
                  {responders.find(r => r.id === showActions)?.name}
                </span>
              </p>
              {responders.find(r => r.id === showActions)?.actions.length === 0 ? (
                <p className="text-gray-500 mt-2">No actions recorded.</p>
              ) : (
                <ul className="list-disc pl-5 mt-2">
                  {responders
                    .find(r => r.id === showActions)
                    ?.actions.map((action, index) => (
                      <li key={index} className="text-gray-600">
                        {action}
                      </li>
                    ))}
                </ul>
              )}
            </div>
            <div className="flex justify-end">
              <button
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-300"
                onClick={() => setShowActions(null)}
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

export default ResponderManagement;