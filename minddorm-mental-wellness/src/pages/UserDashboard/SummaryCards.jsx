// import React from 'react';

// const SummaryCard = ({ title, value, unit, bgColor, textColor }) => (
//   <div className={`p-4 rounded-lg shadow-md ${bgColor} text-white`}>
//     <p className={`text-sm opacity-90 ${textColor}`}>{title}</p>
//     <p className="text-3xl font-bold mt-1">
//       {value}
//       {unit && <span className="text-lg font-light ml-1">{unit}</span>}
//     </p>
//   </div>
// );

// const SummaryCards = () => {
//   return (
//     <div className="grid grid-cols-3 gap-4">
//       <SummaryCard
//         title="Current Streak"
//         value="20"
//         unit="days"
//         bgColor="bg-teal-500" // Light blue/teal background
//         textColor="text-white"
//       />
//       <SummaryCard
//         title="Average Mood"
//         value="3.6"
//         unit="/5"
//         bgColor="bg-green-600" // Green background
//         textColor="text-white"
//       />
//       <SummaryCard
//         title="Sessions attended"
//         value="1"
//         bgColor="bg-purple-600" // Purple background
//         textColor="text-white"
//       />
//     </div>
//   );
// };

// export default SummaryCards;






// src/components/SummaryCards.jsx
// ✅ SAME UI - ONLY DATA IS NOW REAL

import React, { useState, useEffect } from 'react';
import apiClient from '../../utils/apiClient';

const SummaryCard = ({ title, value, unit, bgColor, textColor }) => (
  <div className={`p-4 rounded-lg shadow-md ${bgColor} text-white`}>
    <p className={`text-sm opacity-90 ${textColor}`}>{title}</p>
    <p className="text-3xl font-bold mt-1">
      {value}
      {unit && <span className="text-lg font-light ml-1">{unit}</span>}
    </p>
  </div>
);

const SummaryCards = () => {
  const [stats, setStats] = useState({
    currentStreak: 0,
    averageMood: 0,
    sessionsAttended: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await apiClient.fetchWithAuth('/api/mood/stats');
      const data = await response.json();

      if (data.success) {
        setStats({
          currentStreak: data.data.currentStreak || 0,
          averageMood: data.data.averageMood || 0,
          sessionsAttended: 0 // TODO: Add sessions tracking later
        });
      }
    } catch (error) {
      console.error('Error fetching summary stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-200 animate-pulse h-24 rounded-lg"></div>
        <div className="bg-gray-200 animate-pulse h-24 rounded-lg"></div>
        <div className="bg-gray-200 animate-pulse h-24 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      <SummaryCard
        title="Current Streak"
        value={stats.currentStreak}
        unit="days"
        bgColor="bg-teal-500"
        textColor="text-white"
      />
      <SummaryCard
        title="Average Mood"
        value={stats.averageMood.toFixed(1)}
        unit="/5"
        bgColor="bg-green-600"
        textColor="text-white"
      />
      <SummaryCard
        title="Sessions attended"
        value={stats.sessionsAttended}
        bgColor="bg-purple-600"
        textColor="text-white"
      />
    </div>
  );
};

export default SummaryCards;