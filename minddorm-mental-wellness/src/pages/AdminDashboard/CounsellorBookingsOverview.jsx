// src/pages/CounsellorBookingsOverview.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

// Define the full base URL for the backend server
const API_BASE_URL = 'http://localhost:5050/api/admin'; 

const CounsellorBookingsOverview = () => {
    const [counselors, setCounselors] = useState([]);
    const [allBookings, setAllBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // 🆕 NEW STATE: Stores the ID of the counselor to filter by (null means show all)
    const [selectedCounselorId, setSelectedCounselorId] = useState(null); 

    const fetchCounselorData = async () => {
        // 1. 🔑 FIX: Retrieve the token using the correct key from Local Storage ('token')
        const token = localStorage.getItem('token'); 

        if (!token) {
            setIsLoading(false);
            return setError("Authentication Failed: Please log in as Super Admin.");
        }
        
        // 2. 🛡️ Set up the Authorization header for all API calls
        const config = {
            headers: {
                'Authorization': `Bearer ${token}` 
            }
        };
        
        try {
            // Fetch Roster & Load (Super Admin API endpoint)
            const rosterResponse = await axios.get(`${API_BASE_URL}/counselors-roster-with-load`, config);
            setCounselors(rosterResponse.data.roster);

            // Fetch ALL Booked Slots (Super Admin API endpoint)
            const bookingsResponse = await axios.get(`${API_BASE_URL}/all-booked-slots`, config);
            setAllBookings(bookingsResponse.data.slots);

        } catch (err) {
            const status = err.response ? err.response.status : 'Network Error';
            console.error("Error fetching admin data:", status, err.message);
            
            if (status === 401) {
                setError("Authentication Failed: Session expired or invalid token.");
            } else if (status === 403) {
                setError("Access Denied: You must be logged in as Super Admin.");
            } else if (status === 404) {
                 setError(`Server Error: API route not found at ${API_BASE_URL}.`);
            } else {
                 setError("Failed to load counselor data. Check server connectivity.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCounselorData();
    }, []);

    // 🆕 NEW HANDLER: Toggles the filter on button click
    const handleViewSchedule = (counselorId) => {
        // If the same counselor is clicked again, reset the filter (show all)
        if (selectedCounselorId === counselorId) {
            setSelectedCounselorId(null);
        } else {
            // Otherwise, set the filter to the clicked counselor
            setSelectedCounselorId(counselorId);
        }
    };
    
    // 🆕 NEW FILTER LOGIC: Filters the global bookings based on the selected counselor ID
    const filteredBookings = allBookings.filter(slot => {
        // If no filter is active, show all bookings
        if (selectedCounselorId === null) return true;
        
        // Filter by the counselor_id (NOTE: Requires counsellor_id in the API response!)
        return slot.counsellor_id === selectedCounselorId;
    });

    // Utility to get the selected counselor's name for the header
    const getSelectedCounselorName = () => {
        const selected = counselors.find(c => c.id === selectedCounselorId);
        return selected ? selected.name : 'All Counselors';
    };

    if (isLoading) {
        return <div className="p-6 text-center text-gray-500">Loading counselor data...</div>;
    }

    if (error) {
        return <div className="p-6 text-center text-red-600 font-bold">{error}</div>;
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-[#000459] mb-4">Upcoming Counselling sessions</h2>
            
            {/* Counselor Roster Table */}
            <div className="overflow-x-auto mb-8">
                <h3 className="text-xl font-medium mb-2">Counselor Load</h3>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Counselor Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialization</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active Bookings</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {counselors.length > 0 ? (
                            counselors.map((counselor) => (
                                <tr key={counselor.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{counselor.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{counselor.specialization}</td>
                                    {/* The activeBookings count comes directly from your API response */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-[#2970FF]">{counselor.activeBookings || 0}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <button 
                                            // 🆕 NEW: Use the handler function with the counselor's ID
                                            onClick={() => handleViewSchedule(counselor.id)}
                                            className={`font-medium ${selectedCounselorId === counselor.id ? 'text-red-600' : 'text-indigo-600 hover:text-indigo-900'}`}
                                        >
                                            {/* 🆕 NEW: Dynamic button text */}
                                            {selectedCounselorId === counselor.id ? 'Show All' : 'View Schedule'}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="4" className="px-6 py-4 text-center text-gray-500">No counselors found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Global Booked Slots List */}
            <h3 className="text-xl font-medium text-[#000459] mb-2">
                {/* 🆕 NEW: Dynamic List Header */}
                Upcoming Booked Slots ({getSelectedCounselorName()})
            </h3>
            <div className="overflow-x-auto bg-gray-50 p-4 rounded-lg">
                <ul className="space-y-2">
                    {/* 🆕 CRITICAL: Map over the filteredBookings list */}
                    {filteredBookings.length > 0 ? (
                        filteredBookings.map((slot, index) => (
                            <li key={index} className="flex justify-between items-center p-3 bg-white rounded-md shadow-sm border border-gray-200">
                                <div className="flex flex-col">
                                    <span className="font-semibold text-gray-700">
                                        {/* Displaying Date, Time, and Counselor Name */}
                                        {slot.date} at {slot.time}
                                    </span>
                                    <span className="text-sm text-gray-600 mt-1">
                                        Student: {slot.student_name} ({slot.student_email})
                                    </span>
                                </div>
                                <span className="text-[#7F56D9] font-medium">
                                    {slot.counselor_name} ({slot.specialization})
                                </span>
                            </li>
                        ))
                    ) : (
                        <li className="text-center text-gray-500">
                            {/* 🆕 NEW: Dynamic empty message */}
                            {selectedCounselorId !== null ? `The selected counselor has no upcoming booked slots.` : 'No upcoming slots currently booked across the platform.'}
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default CounsellorBookingsOverview;