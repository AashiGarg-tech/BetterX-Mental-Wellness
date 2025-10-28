import React, { useState, useEffect } from 'react';
import { Calendar, UserCircle, Frown } from 'lucide-react'; 
import apiClient from '../../utils/apiClient';

const API_BASE_URL = 'http://localhost:5050/api'; 
const MAX_VISIBLE_APPOINTMENTS = 3; // Define the maximum to show initially
// ----------------------------


// Helper function to format SQL Date and Time into readable strings (Hoisted)
const formatDateTime = (dateString, timeString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    const timeParts = timeString.split(':');
    const hours = parseInt(timeParts[0], 10);
    const minutes = timeParts[1];
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;

    const formattedTime = `${formattedHours}:${minutes} ${ampm}`;
    
    return { formattedDate, formattedTime };
};


// Reusable component for the Appointment Cards (Display component)
const AppointmentRow = ({ doctor, title, date, time, status }) => {
    const statusClasses = {
        Pending: 'bg-yellow-100 text-yellow-700',
        Confirmed: 'bg-green-100 text-green-700',
        Cancelled: 'bg-red-100 text-red-700',
    };

    return (
        <div className="flex justify-between items-center py-4 border-b last:border-b-0">
            <div className="flex items-center space-x-3">
                <UserCircle className="w-8 h-8 text-blue-400" />
                <div>
                    <p className="text-gray-800 font-medium">{doctor}</p>
                    <p className="text-sm text-gray-500">{title}</p>
                    <p className="text-sm text-gray-500">
                        {date}, {time}
                    </p>
                </div>
            </div>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusClasses[status] || 'bg-gray-100 text-gray-500'}`}>
                {status}
            </span>
        </div>
    );
};


// Main Component
const UpcomingAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0); 

    // ⚠️ NEW STATE: Controls how many appointments are visible
    const [visibleCount, setVisibleCount] = useState(MAX_VISIBLE_APPOINTMENTS);


    useEffect(() => {
        const fetchBookings = async () => {
            setIsLoading(true);
            setError(null);
            
            try {
                const response = await apiClient.fetchWithAuth('/api/bookings/my-appointments');

                if (response.status === 401 || response.status === 403) {
                    throw new Error("Session expired. Please log in again.");
                }
                if (!response.ok) {
                    throw new Error(`Failed to fetch bookings. Status: ${response.status}`);
                }
                
                const rawData = await response.json();
                
                setAppointments(rawData.map(booking => {
                    const { formattedDate, formattedTime } = formatDateTime(
                        booking.schedule_date, 
                        booking.schedule_time
                    );
                    return {
                        doctor: booking.counsellor_name,
                        title: booking.counsellor_title,
                        date: formattedDate,
                        time: formattedTime,
                        status: booking.status,
                    };
                }));

            } catch (err) {
                console.error("Failed to load student bookings:", err);
                setError(err.message); 
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchBookings();

    }, [refreshKey]); // Only depend on refreshKey since we removed token

    // Determine which appointments to display: only the slice based on visibleCount
    const appointmentsToDisplay = appointments.slice(0, visibleCount);
    const hasMoreAppointments = appointments.length > MAX_VISIBLE_APPOINTMENTS;
    const isViewingAll = visibleCount >= appointments.length;

    // --- Component Rendering ---

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center space-x-2 mb-4">
                <Calendar className="text-gray-600 w-5 h-5" />
                <h2 className="text-xl font-semibold text-gray-800">Your Upcoming Counselling Appointments</h2>
                
                {/* Manual refresh button */}
                <button 
                    onClick={() => setRefreshKey(prev => prev + 1)}
                    className="ml-auto text-sm text-blue-600 hover:text-blue-800 font-medium"
                    disabled={isLoading}
                >
                    {isLoading ? 'Refreshing...' : 'Refresh List'}
                </button>
            </div>
            
            <div className="min-h-[150px]">
                {/* Loading / Error / No Bookings States (remain the same) */}
                {isLoading && ( /* Loading JSX */ <div className="flex justify-center items-center h-full py-8 text-blue-600">... Loading Bookings...</div> )}
                {error && ( /* Error JSX */ <div className="text-center py-8 text-red-500">... {error}</div> )}
                {!isLoading && !error && appointments.length === 0 && ( /* No Bookings JSX */ 
                    <div className="text-center py-8 text-gray-500">
                        <p className="font-medium">You have no upcoming confirmed sessions.</p>
                        <p className="text-sm mt-1">Visit the Support Page to book one!</p>
                    </div>
                )}

                {/* ⚠️ DISPLAYING SLICED APPOINTMENTS */}
                {!isLoading && appointments.length > 0 && (
                    <div className='pb-2'>
                        {appointmentsToDisplay.map((item, index) => (
                            <AppointmentRow
                                key={index}
                                doctor={item.doctor}
                                title={item.title}
                                date={item.date}
                                time={item.time}
                                status={item.status}
                            />
                        ))}
                    </div>
                )}
            </div>
            
            {/* ⚠️ VIEW MORE / VIEW LESS BUTTON */}
            {!isLoading && appointments.length > 0 && hasMoreAppointments && (
                <div className="text-center pt-2">
                    {isViewingAll ? (
                        <button
                            onClick={() => setVisibleCount(MAX_VISIBLE_APPOINTMENTS)}
                            className="text-sm text-blue-600 font-semibold hover:text-blue-800"
                        >
                            View Less (Showing {MAX_VISIBLE_APPOINTMENTS})
                        </button>
                    ) : (
                        <button
                            onClick={() => setVisibleCount(appointments.length)}
                            className="text-sm text-blue-600 font-semibold hover:text-blue-800"
                        >
                            View More ({appointments.length - MAX_VISIBLE_APPOINTMENTS} hidden)
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default UpcomingAppointments;