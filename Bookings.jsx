import { useState } from 'react';

function Bookings() {
  const [view, setView] = useState('table');
  const bookings = [
    {
      id: 1,
      customer: 'John Doe',
      date: '2025-07-28',
      service: 'Police',
      status: 'Pending',
    },
    {
      id: 2,
      customer: 'Jane Smith',
      date: '2025-07-29',
      service: 'Ambulance',
      status: 'Confirmed',
    },
  ];

  const handleAccept = (bookingId) => {
    console.log(`Accepting booking ${bookingId}`);
  };

  const handleReject = (bookingId) => {
    console.log(`Rejecting booking ${bookingId}`);
  };

  const renderTableView = () => (
    <div className="space-y-3">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-3 text-left">Customer</th>
            <th className="border p-3 text-left">Service</th>
            <th className="border p-3 text-left">Date</th>
            <th className="border p-3 text-left">Status</th>
            <th className="border p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id} className="bg-gray-50">
              <td className="border p-3">{booking.customer}</td>
              <td className="border p-3">{booking.service}</td>
              <td className="border p-3">{booking.date}</td>
              <td className="border p-3">{booking.status}</td>
              <td className="border p-3">
                <div className="space-x-3">
                  <button
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300"
                    onClick={() => handleAccept(booking.id)}
                  >
                    <i className="fas fa-check mr-2"></i>Accept
                  </button>
                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                    onClick={() => handleReject(booking.id)}
                  >
                    <i className="fas fa-times mr-2"></i>Reject
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderCalendarView = () => (
    <div className="space-y-3">
      <div className="grid grid-cols-7 gap-1 bg-gray-100 p-3 rounded-lg">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
          <div key={day} className="text-center font-medium text-gray-700">
            {day}
          </div>
        ))}
        {Array.from({ length: 35 }, (_, i) => {
          const date = `2025-07-${(i % 7) + 28}`; // Simplified mock dates starting from July 28
          const dayBookings = bookings.filter((b) => b.date === date);
          return (
            <div
              key={i}
              className="border p-2 h-24 bg-white rounded-lg overflow-y-auto"
            >
              {dayBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="text-sm bg-gray-50 p-1 mb-1 rounded"
                >
                  <span className="font-medium">{booking.customer}</span> -{' '}
                  {booking.service} ({booking.status})
                  <div className="space-x-2 mt-1">
                    <button
                      className="bg-green-600 text-white px-2 py-1 text-xs rounded hover:bg-green-700 transition duration-300"
                      onClick={() => handleAccept(booking.id)}
                    >
                      Accept
                    </button>
                    <button
                      className="bg-red-600 text-white px-2 py-1 text-xs rounded hover:bg-red-700 transition duration-300"
                      onClick={() => handleReject(booking.id)}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Bookings</h1>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <div className="space-x-3">
            <button
              className={`px-4 py-2 rounded-lg transition duration-300 ${view === 'calendar'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              onClick={() => setView('calendar')}
            >
              <i className="fas fa-calendar mr-2"></i>Calendar View
            </button>
            <button
              className={`px-4 py-2 rounded-lg transition duration-300 ${view === 'table'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              onClick={() => setView('table')}
            >
              <i className="fas fa-table mr-2"></i>Table View
            </button>
          </div>
          <div className="space-x-3">
            <select className="border p-2 rounded-lg bg-white focus:ring-2 focus:ring-blue-500">
              <option>Date</option>
              <option>Today</option>
              <option>Tomorrow</option>
            </select>
            <select className="border p-2 rounded-lg bg-white focus:ring-2 focus:ring-blue-500">
              <option>Status</option>
              <option>Pending</option>
              <option>Confirmed</option>
              <option>Completed</option>
            </select>
            <select className="border p-2 rounded-lg bg-white focus:ring-2 focus:ring-blue-500">
              <option>Worker Type</option>
              <option>police</option>
              <option>ambulance</option>
            </select>
          </div>
        </div>
        {view === 'table' ? renderTableView() : renderCalendarView()}
      </div>
    </div>
  );
}

export default Bookings;