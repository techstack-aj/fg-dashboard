// DashboardToggle.tsx - Wechsel zwischen Original und MUI Dashboard
import React from 'react';

export default function DashboardToggle() {
  const currentVersion = localStorage.getItem('dashboard-version') || 'original';
  const isMUI = currentVersion === 'mui';

  const toggleDashboard = () => {
    const newVersion = isMUI ? 'original' : 'mui';
    localStorage.setItem('dashboard-version', newVersion);
    window.location.reload();
  };

  return (
    <button
      onClick={toggleDashboard}
      className="fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-lg font-medium transition-colors z-50
                 bg-blue-600 text-white hover:bg-blue-700"
      title={`Wechsel zu ${isMUI ? 'Original' : 'MUI'} Dashboard`}
    >
      {isMUI ? '🎨 → Original' : '🎨 → MUI'}
    </button>
  );
}
