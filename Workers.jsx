import { useState } from 'react';

function Workers() {
  const [showAddWorker, setShowAddWorker] = useState(false);
  const [showEditWorker, setShowEditWorker] = useState(false);
  const [showAvailability, setShowAvailability] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [workers, setWorkers] = useState([]); // New state for workers list
  const [editWorkerId, setEditWorkerId] = useState(null); // Track worker being edited

  const handleAddWorker = (e) => {
    e.preventDefault();
    const newWorker = {
      id: Date.now(), // Simple unique ID
      name: e.target.workerName.value,
      email: e.target.workerEmail.value
    };
    setWorkers([...workers, newWorker]);
    setShowAddWorker(false);
    e.target.reset(); // Clear form
  };

  const handleEditWorker = (e) => {
    e.preventDefault();
    const updatedWorkers = workers.map(worker =>
      worker.id === editWorkerId
        ? { ...worker, name: e.target.workerName.value, email: e.target.workerEmail.value }
        : worker
    );
    setWorkers(updatedWorkers);
    setShowEditWorker(false);
    setEditWorkerId(null);
    e.target.reset();
  };

  const handleDeleteWorker = (workerId) => {
    if (window.confirm('Are you sure you want to delete this worker?')) {
      setWorkers(workers.filter(worker => worker.id !== workerId));
    }
  };

  const handleSetAvailability = (e) => {
    e.preventDefault();
    console.log('Setting availability:', e.target.availability.value);
    setShowAvailability(false);
  };

  const handleEditClick = (worker) => {
    setEditWorkerId(worker.id);
    setShowEditWorker(true);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Workers</h1>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Worker List</h2>
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            onClick={() => setShowAddWorker(true)}
          >
            <i className="fas fa-plus mr-2"></i>Add Worker
          </button>
        </div>
        <div className="space-y-3">
          {workers.length === 0 ? (
            <p className="text-gray-500">No workers added yet.</p>
          ) : (
            workers.map(worker => (
              <div key={worker.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="text-gray-700 font-medium">{worker.name}</span>
                  <p className="text-gray-500 text-sm">{worker.email}</p>
                </div>
                <div className="space-x-3">
                  <button
                    className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition duration-300"
                    onClick={() => handleEditClick(worker)}
                  >
                    <i className="fas fa-edit mr-2"></i>Edit
                  </button>
                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                    onClick={() => handleDeleteWorker(worker.id)}
                  >
                    <i className="fas fa-trash mr-2"></i>Delete
                  </button>
                  <button
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300"
                    onClick={() => setShowAvailability(true)}
                  >
                    <i className="fas fa-clock mr-2"></i>Set Availability
                  </button>
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                    onClick={() => setShowFeedback(true)}>
                    <i className="fas fa-star mr-2"></i>View Feedback
                  </button>
                </div>
              </div>
            )
            )
          )
          }
        </div>
      </div>

      {showAddWorker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Worker</h2>
            <form onSubmit={handleAddWorker}>
              <div className="mb-4">
                <input
                  type="text"
                  name="workerName"
                  placeholder="Worker Name"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
                <input
                  type="email"
                  name="workerEmail"
                  placeholder="Worker Email"
                  className="w-full p-2 border border-gray-300 rounded-lg mt-2"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-300"
                  onClick={() => setShowAddWorker(false)}>Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">Add Worker
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEditWorker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit Worker</h2>
            <form onSubmit={handleEditWorker}>
              <div className="mb-4">
                <input
                  type="text"
                  name="workerName"
                  placeholder="Worker Name"
                  defaultValue={workers.find(w => w.id === editWorkerId)?.name}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
                <input
                  type="email"
                  name="workerEmail"
                  placeholder="Worker Email"
                  defaultValue={workers.find(w => w.id === editWorkerId)?.email}
                  className="w-full p-2 border border-gray-300 rounded-lg mt-2"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                  onClick={() => {
                    setShowEditWorker(false);
                    setEditWorkerId(null);
                  }}>Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAvailability && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Set Availability</h2>
            <form onSubmit={handleSetAvailability}>
              <div className="mb-4">
                <select
                  name="availability"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                >
                  <option value="">Select Availability</option>
                  <option value="available">Available</option>
                  <option value="unavailable">Unavailable</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                  onClick={() => setShowAvailability(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Set
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Worker Feedback</h2>
            <div className="mb-4">
              <p>Rating: ★★★★☆</p>
              <p>Comment: Great service!</p>
            </div>
            <div className="flex justify-end">
              <button
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                onClick={() => setShowFeedback(false)}
              > Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Workers;