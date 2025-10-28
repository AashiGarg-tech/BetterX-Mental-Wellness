// import React from 'react';
// import { Award, CheckCircle, Calendar, Users } from 'lucide-react';

// const AchievementItem = ({ icon: Icon, title, date, color }) => (
//   <div className="flex items-center space-x-4 py-3 border-b last:border-b-0">
//     <Icon className={`w-6 h-6 ${color}`} />
//     <div>
//       <p className="text-gray-800 font-medium">{title}</p>
//       <p className="text-sm text-gray-500">Sep {date}</p>
//     </div>
//   </div>
// );

// const Achievements = () => {
//   const achievements = [
//     { icon: Award, title: 'Mood Master', date: 23, color: 'text-yellow-500' },
//     { icon: CheckCircle, title: 'Completed 3 guided mediations', date: 23, color: 'text-blue-500' },
//     { icon: Calendar, title: 'Week warrior', date: 8, color: 'text-green-500' },
//     { icon: Users, title: 'First Check-in', date: 3, color: 'text-red-500' },
//   ];

//   return (
//     <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//       <h2 className="text-xl font-semibold text-gray-800 mb-4">Achievements</h2>
//       <div className="space-y-1">
//         {achievements.map((item, index) => (
//           <AchievementItem 
//             key={index}
//             icon={item.icon}
//             title={item.title}
//             date={item.date}
//             color={item.color}
//           />
//         ))}
//       </div>
//       <div className="mt-4 text-right"> 
//         <button className="text-blue-500 text-sm font-medium hover:text-blue-700">
//           View More..
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Achievements;





import React, { useState, useEffect } from 'react';
import { Award, CheckCircle, Calendar, Users, Loader2 } from 'lucide-react';
import apiClient from '../../utils/apiClient';

const iconMap = {
  Award: Award,
  CheckCircle: CheckCircle,
  Calendar: Calendar,
  Users: Users
};

const AchievementItem = ({ icon, title, date, color }) => {
  const Icon = iconMap[icon] || Award;
  
  return (
    <div className="flex items-center space-x-4 py-3 border-b last:border-b-0">
      <Icon className={`w-6 h-6 ${color}`} />
      <div>
        <p className="text-gray-800 font-medium">{title}</p>
        {date && <p className="text-sm text-gray-500">{new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>}
      </div>
    </div>
  );
};

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const response = await apiClient.fetchWithAuth('/api/user-stats/achievements');

      const data = await response.json();
      
      if (data.success && data.data.achievements) {
        // Map achievements to display format
        const mappedAchievements = data.data.achievements.map(achievement => ({
          icon: achievement.icon,
          title: achievement.title,
          date: achievement.date,
          color: getColorForIcon(achievement.icon)
        }));
        
        setAchievements(mappedAchievements);
      } else {
        // Show default achievements if none earned yet
        setAchievements([
          { icon: 'Users', title: 'Start your first check-in', date: null, color: 'text-gray-400' }
        ]);
      }
    } catch (error) {
      console.error('Error fetching achievements:', error);
      setAchievements([
        { icon: 'Users', title: 'Start your first check-in', date: null, color: 'text-gray-400' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getColorForIcon = (iconName) => {
    const colorMap = {
      Award: 'text-yellow-500',
      CheckCircle: 'text-blue-500',
      Calendar: 'text-green-500',
      Users: 'text-red-500'
    };
    return colorMap[iconName] || 'text-gray-500';
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Achievements</h2>
      
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-[#5AA7E8]" />
        </div>
      ) : achievements.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No achievements yet. Start tracking your mood!</p>
      ) : (
        <>
          <div className="space-y-1">
            {achievements.slice(0, 4).map((item, index) => (
              <AchievementItem 
                key={index}
                icon={item.icon}
                title={item.title}
                date={item.date}
                color={item.color}
              />
            ))}
          </div>
          {achievements.length > 4 && (
            <div className="mt-4 text-right"> 
              <button className="text-blue-500 text-sm font-medium hover:text-blue-700">
                View More ({achievements.length - 4} hidden)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Achievements;