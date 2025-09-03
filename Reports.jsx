import React, { useState } from 'react';

function Reports({ addNotification }) {
  const [alerts] = useState([
    { id: 'A001', userId: 'U123', location: 'Downtown', time: '30 Aug 2025 14:00', status: 'Pending' },
    { id: 'A002', userId: 'U456', location: 'Suburb', time: '29 Aug 2025 09:30', status: 'Resolved' },
    { id: 'A003', userId: 'U789', location: 'Downtown', time: '29 Aug 2025 15:45', status: 'Resolved' },
  ]);

  const handleExportReport = (type) => {
    let csv;
    if (type === 'alerts') {
      csv = 'ID,User ID,Location,Time,Status\n' + 
        alerts.map(a => `${a.id},${a.userId},${a.location},${a.time},${a.status}`).join('\n');
    } else if (type === 'frequency') {
      const frequency = alerts.reduce((acc, alert) => {
        const date = alert.time.split(' ')[0];
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});
      csv = 'Date,Alert Count\n' + 
        Object.entries(frequency).map(([date, count]) => `${date},${count}`).join('\n');
    } else if (type === 'high-risk') {
      const locations = alerts.reduce((acc, alert) => {
        acc[alert.location] = (acc[alert.location] || 0) + 1;
        return acc;
      }, {});
      csv = 'Location,Alert Count\n' + 
        Object.entries(locations).map(([location, count]) => `${location},${count}`).join('\n');
    }
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}_report.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    console.log(`Exporting ${type} report as CSV`);
    if (addNotification) {
      addNotification(`${type.charAt(0).toUpperCase() + type.slice(1)} report exported successfully`);
    }
  };

  const successRate = (alerts.filter(a => a.status === 'Resolved').length / alerts.length * 100).toFixed(1);
  const highRiskAreas = [...new Set(alerts.map(a => a.location))];

  return (
      <div className="p-6 min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Reports and Analytics</h1>
        <div className="flex space-x-4 mb-6">
          <button
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300"
            onClick={() => handleExportReport('alerts')}
          >
            <i className="fas fa-file-export mr-2"></i>Export Alerts
          </button>
          <button
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300"
            onClick={() => handleExportReport('frequency')}
          >
            <i className="fas fa-file-export mr-2"></i>Export Frequency
          </button>
          <button
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300"
            onClick={() => handleExportReport('high-risk')}
          >
            <i className="fas fa-file-export mr-2"></i>Export High-Risk Areas
          </button>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Alert Heatmap</h2>
          <div className="h-64 bg-gray-100 flex items-center justify-center">
            <p className="text-gray-500">
              Placeholder: Heatmap of alert locations (use Leaflet with leaflet.heat plugin in production)
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Analytics Summary</h2>
          <p className="text-gray-600 mb-2">Total Alerts: {alerts.length}</p>
          <p className="text-gray-600 mb-2">Response Success Rate: {successRate}%</p>
          <p className="text-gray-600">High-Risk Areas: {highRiskAreas.join(', ')}</p>
        </div>
      </div>
  );
}

export default Reports;