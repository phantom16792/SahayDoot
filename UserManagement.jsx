import { useState } from 'react';

function UserManagement({ addNotification }) {
  const [showAddUser, setShowAddUser] = useState(false);
  const [showEditUser, setShowEditUser] = useState(null);
  const [users, setUsers] = useState([
    { id: 'U123', name: 'Jane Doe', email: 'jane@example.com', role: 'User', status: 'Active' },
    { id: 'U456', name: 'Volunteer John', email: 'john@example.com', role: 'Responder', status: 'Active' },
    { id: 'U789', name: 'Sarah Smith', email: 'sarah@example.com', role: 'Support', status: 'Suspended' },
  ]);

  const handleAddUser = (e) => {
    e.preventDefault();
    const newUser = {
      id: `U${Math.floor(Math.random() * 1000)}`,
      name: e.target.name.value,
      email: e.target.email.value,
      role: e.target.role.value,
      status: 'Active',
    };
    setUsers([...users, newUser]);
    console.log('Adding user:', newUser);
    setShowAddUser(false);
    if (addNotification) {
      addNotification(`User ${newUser.name} added successfully`);
    }
  };

  const handleEditUser = (e, userId) => {
    e.preventDefault();
    const updatedUsers = users.map(user =>
      user.id === userId
        ? { ...user, role: e.target.role.value, status: e.target.status.value }
        : user
    );
    setUsers(updatedUsers);
    console.log('Editing user:', userId, {
      role: e.target.role.value,
      status: e.target.status.value,
    });
    setShowEditUser(null);
    if (addNotification) {
      addNotification(`User ${userId} updated successfully`);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">User Management</h1>
      <button
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 mb-6"
        onClick={() => setShowAddUser(true)}
      >
        <i className="fas fa-plus mr-2"></i>Add User
      </button>
      <div className="bg-white p-6 rounded-xl shadow-md">
        {users.length === 0 ? (
          <p className="text-gray-600">No users available.</p>
        ) : (
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-t">
                  <td className="p-3">{user.id}</td>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.role}</td>
                  <td className="p-3">{user.status}</td>
                  <td className="p-3">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => setShowEditUser(user.id)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add User Modal */}
      {showAddUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New User</h2>
            <form onSubmit={handleAddUser}>
              <div className="mb-4">
                <label className="block text-gray-600 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter name"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
                <label className="block text-gray-600 mb-1 mt-2">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
                <label className="block text-gray-600 mb-1 mt-2">Role</label>
                <select
                  name="role"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                >
                  <option value="">Select Role</option>
                  <option value="User">User</option>
                  <option value="Responder">Responder</option>
                  <option value="Admin">Admin</option>
                  <option value="Support">Support</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-300"
                  onClick={() => setShowAddUser(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit User</h2>
            <form onSubmit={(e) => handleEditUser(e, showEditUser)}>
              <div className="mb-4">
                <label className="block text-gray-600 mb-1">Role</label>
                <select
                  name="role"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                >
                  <option value="">Select Role</option>
                  <option value="User">User</option>
                  <option value="Responder">Responder</option>
                  <option value="Admin">Admin</option>
                  <option value="Support">Support</option>
                </select>
                <label className="block text-gray-600 mb-1 mt-2">Status</label>
                <select
                  name="status"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-300"
                  onClick={() => setShowEditUser(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserManagement;