import React, { useState, useEffect } from "react";
import axios from "axios";
// Assuming these are local to AdminDashboard directory based on your old code:
import StatCard from "./StatCard.jsx";
import ChartCard from './ChartCard'; 
import CounsellorBookingsOverview from './CounsellorBookingsOverview';
import EngagementCard from './EngagementCard'; 

// Define the API base URL for staff endpoints
const API_BASE_URL = 'http://localhost:5050/api/staff';

// ----------------------------------------------------
// 🧑‍💼 COUNSELOR-SPECIFIC VIEW COMPONENT
// This component fetches and displays ONLY the counselor's schedule.
// ----------------------------------------------------

const CounselorScheduleView = ({ userEmail }) => {
    const [myBookings, setMyBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMyBookings = async () => {
        const token = localStorage.getItem('token'); 

        if (!token) {
            setIsLoading(false);
            return setError("Authentication Required: Please log in.");
        }
        
        const config = {
            headers: {
                'Authorization': `Bearer ${token}` 
            }
        };
        
        try {
            // Use the secured endpoint for personal bookings
            const response = await axios.get(`${API_BASE_URL}/my-bookings`, config);
            setMyBookings(response.data.bookings);

        } catch (err) {
            const status = err.response ? err.response.status : 'Network Error';
            console.error("Error fetching personal schedule:", status, err.message);
            
            if (status === 403) {
                setError("Access Denied: Your role does not permit access to this portal.");
            } else {
                setError(`Failed to load schedule. Status: ${status}.`);
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMyBookings();
    }, []);

    if (isLoading) {
        return <div className="p-8 text-center text-gray-500">Loading your schedule...</div>;
    }

    if (error) {
        return <div className="p-8 text-center text-red-600 font-bold">{error}</div>;
    }

    return (
        <div className="bg-white font-sans p-8 max-w-5xl mx-auto rounded-lg shadow-2xl">
            <div className="flex items-center justify-between border-b pb-4 mb-6">
                <h1 className="text-3xl font-bold text-[#000459]">
                    My Counselor Schedule 📅
                </h1>
                <span className="text-sm font-medium text-gray-500">
                    Viewing as: {userEmail} 
                </span>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h2 className="text-xl font-medium text-gray-700 mb-4">Upcoming Sessions: **{myBookings.length}**</h2>
                
                {myBookings.length === 0 ? (
                    <div className="text-center py-10 text-gray-500 border-t border-gray-200">
                        You currently have no upcoming booked appointments.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-[#E5F3FF]">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Time</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Student Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {myBookings.map((booking, index) => (
                                    <tr key={index} className="hover:bg-indigo-50 transition duration-150">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.date}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{booking.time}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-[#7F56D9]">{booking.student_name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};


// ----------------------------------------------------
// 👑 MAIN ROLE-AWARE DASHBOARD 
// ----------------------------------------------------

const AdminDashboard = ({ currentUser }) => {
  // Use the optional chaining operator (?) as currentUser might be null initially
  const role = currentUser?.role; 

  if (role === 'counsellor') {
    // Renders only the personal schedule view for Counselors
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#B5D8EB] to-[#F4F8FB] font-sans p-8">
            <CounselorScheduleView userEmail={currentUser.email} />
        </div>
    );
  }

  // Renders the full Super Admin Dashboard for 'superadmin' role (or default)
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#B5D8EB] to-[#F4F8FB] font-sans">
      {/* 1. Header/Navigation (You'd implement this) */}
      {/* <Header />  */}

      <div className="p-8 max-w-7xl mx-auto">
        {/* Admin Dashboard Title */}
        <h1 className="text-5xl font-semibold text-[#000459]">Admin Dashboard</h1>
        <p className="text-gray-500 mb-6">Monitor platform health and user engagement</p>

        {/* 2. STAT CARDS SECTION (Visible only to Super Admin) */}
        <div className="flex flex-wrap gap-4 mb-8">
          <StatCard title="Total Users" value="1287" colorClass="bg-[#7F56D9]" />
          <StatCard title="Active this month" value="745" colorClass="bg-[#F79009]" />
          <StatCard title="Check-ins Today" value="476" colorClass="bg-[#2970FF]" />
          <StatCard title="Average Mood Score" value="3.8/5" colorClass="bg-[#4CAF50]" />
          <StatCard title="Assessments Today" value="97" colorClass="bg-[#5C6BC0]" />
        </div>

        {/* 3. CHARTS SECTION (Visible only to Super Admin) */}
        <h2 className="text-xl font-semibold text-gray-700 mb-4">User Growth trends</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ChartCard title="User Growth trends" icon="📈">
            <div className="flex items-center justify-center h-full text-gray-400">
              [Line Chart Placeholder]
            </div>
          </ChartCard>

          <ChartCard title="Platform mood score" icon="😊">
            <div className="flex items-center justify-center h-full text-gray-400">
              [Line Chart Placeholder]
            </div>
          </ChartCard>
        </div>

        {/* 4. COUNSELLOR DATA SECTION (Visible only to Super Admin, uses full overview) */}
        <div className="mb-8">
            <CounsellorBookingsOverview />
        </div>

        {/* 5. ENGAGEMENT ANALYTICS SECTION (Grid Layout) */}
        <div className="mb-8">
            <EngagementCard />
        </div>
        
        {/* Footer Text */}
        <div className="text-center mt-12 text-gray-400">
            Don't worry Be happy
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;