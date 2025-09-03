import { useState } from 'react';

function Clients() {
  const [showIssues, setShowIssues] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState(null); // Track selected client for issues
  const [clients, setClients] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'pending', issues: [] },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'pending', issues: ['Late payment'] },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'pending', issues: [] }
  ]);

  const handleApprove = (clientId) => {
    setClients(clients.map(client =>
      client.id === clientId ? { ...client, status: 'approved' } : client
    ));
  };

  const handleBan = (clientId) => {
    setClients(clients.map(client =>
      client.id === clientId ? { ...client, status: 'banned' } : client
    ));
  };

  const handleDeleteClient = (clientId) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      setClients(clients.filter(client => client.id !== clientId));
    }
  };

  const handleViewIssues = (clientId) => {
    setSelectedClientId(clientId);
    setShowIssues(true);
  };

  const selectedClient = clients.find(client => client.id === selectedClientId);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Clients</h1>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Client List</h2>
        </div>
        <div className="space-y-3">
          {clients.length === 0 ? (
            <p className="text-gray-500">No clients available.</p>
          ) : (
            clients.map(client => (
              <div key={client.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="text-gray-700 font-medium">{client.name}</span>
                  <p className="text-gray-500 text-sm">{client.email}</p>
                  <p className="text-gray-500 text-sm">Status: {client.status}</p>
                </div>
                <div className="space-x-3">
                  <button 
                    className={`bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300 ${client.status === 'approved' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => handleApprove(client.id)}
                    disabled={client.status === 'approved'}
                  >
                    <i className="fas fa-check mr-2"></i>Approve
                  </button>
                  <button 
                    className={`bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300 ${client.status === 'banned' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => handleBan(client.id)}
                    disabled={client.status === 'banned'}
                  >
                    <i className="fas fa-ban mr-2"></i>Ban
                  </button>
                  <button 
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                    onClick={() => handleDeleteClient(client.id)}
                  >
                    <i className="fas fa-trash mr-2"></i>Delete
                  </button>
                  <button 
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                    onClick={() => handleViewIssues(client.id)}
                  >
                    <i className="fas fa-eye mr-2"></i>View Issues
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {showIssues && selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Issues for {selectedClient.name}</h2>
            <div className="mb-4">
              {selectedClient.issues.length === 0 ? (
                <p>No issues reported for this client.</p>
              ) : (
                <ul className="list-disc pl-5">
                  {selectedClient.issues.map((issue, index) => (
                    <li key={index} className="text-gray-700">{issue}</li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex justify-end">
              <button
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-300"
                onClick={() => {
                  setShowIssues(false);
                  setSelectedClientId(null);
                }}
              >Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Clients;