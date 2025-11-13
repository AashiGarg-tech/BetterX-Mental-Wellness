// src/pages/CounselorPortal.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5050/api/staff';

const CounselorPortal = () => {
    const [myBookings, setMyBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMyBookings = async () => {
        // 1. Get Token (Same logic as Admin Dashboard)
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
            // 2. Call the new personal booking endpoint
            const response = await axios.get(`${API_BASE_URL}/my-bookings`, config);
            
            // The response data contains the upcoming schedule for this counselor only
            setMyBookings(response.data.bookings);

        } catch (err) {
            const status = err.response ? err.response.status : 'Network Error';
            console.error("Error fetching personal schedule:", status, err.message);
            
            if (status === 403) {
                setError("Access Denied: You must be logged in as a Counselor or Super Admin.");
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
        return <div className="min-h-screen p-8 text-center text-gray-500">Loading your schedule...</div>;
    }

    if (error) {
        return <div className="min-h-screen p-8 text-center text-red-600 font-bold">{error}</div>;
    }

    return (
        <div className="min-h-screen bg-white font-sans p-8 max-w-5xl mx-auto">
            <h1 className="text-3xl font-semibold text-[#000459] mb-6">Counselor Portal: My Upcoming Sessions 📅</h1>
            <p className="text-gray-600 mb-8">This view is filtered to show only appointments assigned to your account.</p>

            <div className="bg-gray-50 p-6 rounded-xl shadow-lg border border-gray-200">
                <h2 className="text-xl font-medium text-gray-700 mb-4">Total Upcoming Sessions: **{myBookings.length}**</h2>
                
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
                                    <tr key={index}>
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

export default CounselorPortal;