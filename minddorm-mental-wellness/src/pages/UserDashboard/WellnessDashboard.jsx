// import React from 'react';

// // Import the conceptual components
// // import Header from '../Header';
// import TipOfTheDay from './TipOfTheDay';
// import SummaryCards from './SummaryCards';
// import MoodTrends from './MoodTrends';
// import Achievements from './Achievements';
// import AssessmentHistory from './AssessmentHistory';
// import UpcomingAppointments from './UpcomingAppointments';
// import PreviousSessionsSummary from './PreviousSessionsSummary';

// // WellnessDashboard.jsx (CORRECTED Layout)

// const WellnessDashboard = () => {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-[#B5D8EB] to-[#F4F8FB] font-sans">
//         {/* <Header /> */}
//         <main className="container mx-auto px-4 py-8">
//           <h1 className="text-5xl font-semibold text-[#000459] mb-8">
//             Your Wellness Dashboard
//           </h1>
  
//           {/* 1. Summary Cards span full width, below the title */}
//           <div className="mb-6">
//             <SummaryCards />
//           </div>
  
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
  
//             {/* LEFT COLUMN (lg:col-span-8) */}
//             <div className="lg:col-span-8 space-y-6">
  
//               {/* A. Tip of the Day sits at the top left, spanning a fixed width. */}
//               {/* The original image structure is complex, but often, the Tip is either 
//                   outside the grid or part of the main content area above the charts. */}
//               <div className="w-full mb-6"> {/* Use w-full on small, w-1/3 on medium screens */}
//                  <TipOfTheDay />
//               </div>
  
//               {/* B. Mood Chart (takes up the rest of the 8 columns) */}
//               <MoodTrends />
  
//               {/* C. Assessment History and Previous Sessions, side-by-side */}
//               <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
//                   <AssessmentHistory />
//                   <PreviousSessionsSummary />
//               </div>
//             </div>
  
//             {/* RIGHT COLUMN (lg:col-span-4) */}
//             <div className="lg:col-span-4 space-y-6">
//               <Achievements />
//               <UpcomingAppointments /> 
//             </div>
  
//           </div>
  
//           <div className="text-center mt-12 text-gray-500 text-sm">
//             Don't worry Be happy
//           </div>
//         </main>
//       </div>
//     );
//   };
// export default WellnessDashboard;





// import React, { useState, useEffect } from 'react';
// import { Heart, Flame, Award, Loader2 } from 'lucide-react';

// // Import the conceptual components
// import TipOfTheDay from './TipOfTheDay';
// import SummaryCards from './SummaryCards';
// import MoodTrends from './MoodTrends';
// import Achievements from './Achievements';
// import AssessmentHistory from './AssessmentHistory';
// import UpcomingAppointments from './UpcomingAppointments';
// import PreviousSessionsSummary from './PreviousSessionsSummary';

// const WellnessDashboard = () => {
//   const [moodStats, setMoodStats] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchMoodStats();
//   }, []);

//   const fetchMoodStats = async () => {
//     try {
//       const token = localStorage.getItem('authToken');
//       const response = await fetch('http://localhost:5050/api/mood/stats', {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });

//       const data = await response.json();
      
//       if (data.success) {
//         setMoodStats(data.data);
//       } else {
//         setMoodStats({ averageMood: 0, totalEntries: 0, currentStreak: 0 });
//       }
//     } catch (error) {
//       console.error('Error fetching mood stats:', error);
//       setMoodStats({ averageMood: 0, totalEntries: 0, currentStreak: 0 });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getMoodEmoji = (avg) => {
//     if (!avg || avg === 0) return '😊';
//     if (avg >= 4.5) return '😊'; // Happy
//     if (avg >= 3.5) return '🙂'; // Calm
//     if (avg >= 2.5) return '😐'; // Neutral
//     if (avg >= 1.5) return '😔'; // Sad
//     return '😰'; // Anxious
//   };

//   const getMoodDescription = (avg) => {
//     if (!avg || avg === 0) return 'Start tracking';
//     if (avg >= 4.5) return 'Excellent';
//     if (avg >= 3.5) return 'Good';
//     if (avg >= 2.5) return 'Moderate';
//     if (avg >= 1.5) return 'Low';
//     return 'Difficult';
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#B5D8EB] to-[#F4F8FB] font-sans">
//       <main className="container mx-auto px-4 py-8">
//         <h1 className="text-5xl font-semibold text-[#000459] mb-8">
//           Your Wellness Dashboard
//         </h1>

//         {/* MOOD STATS CARDS - 3 Cards showing mood data */}
//         {loading ? (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//             <div className="bg-gray-100 animate-pulse h-32 rounded-xl"></div>
//             <div className="bg-gray-100 animate-pulse h-32 rounded-xl"></div>
//             <div className="bg-gray-100 animate-pulse h-32 rounded-xl"></div>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//             {/* Card 1: Average Mood */}
//             <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-xl shadow-md border border-gray-100 transition-transform hover:scale-105">
//               <div className="flex items-start justify-between">
//                 <div>
//                   <p className="text-sm text-gray-600 font-medium mb-1">Average Mood</p>
//                   <p className="text-3xl font-bold text-gray-800 mb-1">
//                     {getMoodEmoji(moodStats?.averageMood)} {moodStats?.averageMood || '-'}
//                   </p>
//                   <p className="text-xs text-gray-500">
//                     {getMoodDescription(moodStats?.averageMood)} (Last 30 days)
//                   </p>
//                 </div>
//                 <div className="bg-pink-500 p-3 rounded-lg">
//                   <Heart className="w-6 h-6 text-white" />
//                 </div>
//               </div>
//             </div>

//             {/* Card 2: Current Streak */}
//             <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl shadow-md border border-gray-100 transition-transform hover:scale-105">
//               <div className="flex items-start justify-between">
//                 <div>
//                   <p className="text-sm text-gray-600 font-medium mb-1">Current Streak</p>
//                   <p className="text-3xl font-bold text-gray-800 mb-1">
//                     {moodStats?.currentStreak || 0} days
//                   </p>
//                   <p className="text-xs text-gray-500">
//                     {moodStats?.currentStreak > 0 ? 'Keep it going! 🔥' : 'Start your streak today'}
//                   </p>
//                 </div>
//                 <div className="bg-orange-500 p-3 rounded-lg">
//                   <Flame className="w-6 h-6 text-white" />
//                 </div>
//               </div>
//             </div>

//             {/* Card 3: Mood Master */}
//             <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl shadow-md border border-gray-100 transition-transform hover:scale-105">
//               <div className="flex items-start justify-between">
//                 <div>
//                   <p className="text-sm text-gray-600 font-medium mb-1">Mood Master</p>
//                   <p className="text-3xl font-bold text-gray-800 mb-1">
//                     {moodStats?.totalEntries || 0}
//                   </p>
//                   <p className="text-xs text-gray-500">Total check-ins</p>
//                 </div>
//                 <div className="bg-purple-500 p-3 rounded-lg">
//                   <Award className="w-6 h-6 text-white" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* 1. Summary Cards span full width, below the title */}
//         {/* <div className="mb-6">
//           <SummaryCards />
//         </div> */}

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

//           {/* LEFT COLUMN (lg:col-span-8) */}
//           <div className="lg:col-span-8 space-y-6">

//             {/* A. Tip of the Day */}
//             <div className="w-full mb-6">
//                <TipOfTheDay />
//             </div>

//             {/* B. Mood Chart (takes up the rest of the 8 columns) */}
//             <MoodTrends />

//             {/* C. Assessment History and Previous Sessions, side-by-side */}
//             <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
//                 <AssessmentHistory />
//                 <PreviousSessionsSummary />
//             </div>
//           </div>

//           {/* RIGHT COLUMN (lg:col-span-4) */}
//           <div className="lg:col-span-4 space-y-6">
//             <Achievements />
//             <UpcomingAppointments /> 
//           </div>

//         </div>

//         <div className="text-center mt-12 text-gray-500 text-sm">
//           Don't worry Be happy
//         </div>
//       </main>
//     </div>
//   );
// };

// export default WellnessDashboard;






// src/components/Dashboard.jsx
// ✅ SAME UI - ONLY DATA IS NOW REAL FROM BACKEND

import React, { useState, useEffect } from 'react';
import { Heart, Flame, Award, Loader2 } from 'lucide-react';
import apiClient from '../../utils/apiClient';

// Import your existing components (SAME AS BEFORE)
import TipOfTheDay from './TipOfTheDay';
import SummaryCards from './SummaryCards';
import MoodTrends from './MoodTrends';
import Achievements from './Achievements';
import AssessmentHistory from './AssessmentHistory';
import UpcomingAppointments from './UpcomingAppointments';
import PreviousSessionsSummary from './PreviousSessionsSummary';

const WellnessDashboard = () => {
  const [moodStats, setMoodStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMoodStats();
  }, []);

  const fetchMoodStats = async () => {
    try {
      const response = await apiClient.fetchWithAuth('/api/mood/stats');

      const data = await response.json();
      
      if (data.success) {
        setMoodStats(data.data);
      } else {
        setMoodStats({ averageMood: 0, totalEntries: 0, currentStreak: 0 });
      }
    } catch (error) {
      console.error('Error fetching mood stats:', error);
      setMoodStats({ averageMood: 0, totalEntries: 0, currentStreak: 0 });
    } finally {
      setLoading(false);
    }
  };

  const getMoodEmoji = (avg) => {
    if (!avg || avg === 0) return '😊';
    if (avg >= 4.5) return '😊'; // Happy
    if (avg >= 3.5) return '🙂'; // Calm
    if (avg >= 2.5) return '😐'; // Neutral
    if (avg >= 1.5) return '😔'; // Sad
    return '😰'; // Anxious
  };

  const getMoodDescription = (avg) => {
    if (!avg || avg === 0) return 'Start tracking';
    if (avg >= 4.5) return 'Excellent';
    if (avg >= 3.5) return 'Good';
    if (avg >= 2.5) return 'Moderate';
    if (avg >= 1.5) return 'Low';
    return 'Difficult';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#B5D8EB] to-[#F4F8FB] font-sans">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-semibold text-[#000459] mb-8">
          Your Wellness Dashboard
        </h1>

        {/* ✅ SAME UI - BUT DATA IS NOW REAL */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-100 animate-pulse h-32 rounded-xl"></div>
            <div className="bg-gray-100 animate-pulse h-32 rounded-xl"></div>
            <div className="bg-gray-100 animate-pulse h-32 rounded-xl"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Card 1: Average Mood - ✅ REAL DATA */}
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-xl shadow-md border border-gray-100 transition-transform hover:scale-105">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium mb-1">Average Mood</p>
                  <p className="text-3xl font-bold text-gray-800 mb-1">
                    {getMoodEmoji(moodStats?.averageMood)} {moodStats?.averageMood?.toFixed(1) || '-'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {getMoodDescription(moodStats?.averageMood)} (Last 30 days)
                  </p>
                </div>
                <div className="bg-pink-500 p-3 rounded-lg">
                  <Heart className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            {/* Card 2: Current Streak - ✅ REAL DATA */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl shadow-md border border-gray-100 transition-transform hover:scale-105">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium mb-1">Current Streak</p>
                  <p className="text-3xl font-bold text-gray-800 mb-1">
                    {moodStats?.currentStreak || 0} days
                  </p>
                  <p className="text-xs text-gray-500">
                    {moodStats?.currentStreak > 0 ? 'Keep it going! 🔥' : 'Start your streak today'}
                  </p>
                </div>
                <div className="bg-orange-500 p-3 rounded-lg">
                  <Flame className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            {/* Card 3: Mood Master - ✅ REAL DATA */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl shadow-md border border-gray-100 transition-transform hover:scale-105">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium mb-1">Mood Master</p>
                  <p className="text-3xl font-bold text-gray-800 mb-1">
                    {moodStats?.totalEntries || 0}
                  </p>
                  <p className="text-xs text-gray-500">Total check-ins</p>
                </div>
                <div className="bg-purple-500 p-3 rounded-lg">
                  <Award className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ✅ REST OF THE UI - EXACTLY SAME AS BEFORE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* LEFT COLUMN (lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-6">

            {/* A. Tip of the Day */}
            <div className="w-full mb-6">
               <TipOfTheDay />
            </div>

            {/* B. Mood Chart (takes up the rest of the 8 columns) */}
            <MoodTrends />

            {/* C. Assessment History and Previous Sessions, side-by-side */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <AssessmentHistory />
                <PreviousSessionsSummary />
            </div>
          </div>

          {/* RIGHT COLUMN (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-6">
            <Achievements />
            <UpcomingAppointments /> 
          </div>

        </div>

        <div className="text-center mt-12 text-gray-500 text-sm">
          Don't worry Be happy
        </div>
      </main>
    </div>
  );
};

export default WellnessDashboard;