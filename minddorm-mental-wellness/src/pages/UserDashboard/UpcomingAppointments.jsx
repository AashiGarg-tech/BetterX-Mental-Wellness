import React, { useState, useEffect } from 'react';
import { Calendar, UserCircle, Frown } from 'lucide-react'; 

const API_BASE_URL = 'http://localhost:5050/api'; 

// --- CONCEPTUAL AUTH HOOK (Crucial for secure fetching) ---
// NOTE: This must be replaced with your actual authentication hook/context.
const useAuth = () => {
    // Reads the live token from storage (e.g., set during login)
    const token = localStorage.getItem('authToken'); 
    
    // MOCK: This user data should come from decoding your JWT payload
    const [user] = useState({ 
        token: token, 
        enrollment_number: '00101172024',
        name: 'John Doe',
    }); 
    return { user };
};
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
    // Retrieve the authenticated token
    const { user } = useAuth();
    const token = user?.token; 
    
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    // State used to manually trigger a refresh (e.g., after booking)
    const [refreshKey, setRefreshKey] = useState(0); 

    useEffect(() => {
        // 1. Authentication Guard: Fails immediately if token is missing
        if (!token) {
            setIsLoading(false);
            setError("Please log in to view your appointments.");
            return;
        }
        
        const fetchBookings = async () => {
            setIsLoading(true);
            setError(null);
            
            try {
                // ⚠️ SECURE FETCH: Sends JWT in the Authorization header
                const response = await fetch(`${API_BASE_URL}/bookings/my-appointments`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`, 
                        'Content-Type': 'application/json'
                    }
                });

                if (response.status === 401 || response.status === 403) {
                    throw new Error("Session expired. Please log in again.");
                }
                if (!response.ok) {
                    throw new Error(`Failed to fetch bookings. Status: ${response.status}`);
                }
                
                const rawData = await response.json();
                
                // Process and format the live data
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

    }, [token, refreshKey]); // Reruns when token or refreshKey changes

    // --- Component Rendering ---

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center space-x-2 mb-4">
                <Calendar className="text-gray-600 w-5 h-5" />
                <h2 className="text-xl font-semibold text-gray-800">Your Upcoming Counselling Appointments</h2>
                
                {/* Manual refresh button for UX (useful after booking) */}
                <button 
                    onClick={() => setRefreshKey(prev => prev + 1)}
                    className="ml-auto text-sm text-blue-600 hover:text-blue-800 font-medium"
                    disabled={isLoading}
                >
                    {isLoading ? 'Refreshing...' : 'Refresh List'}
                </button>
            </div>
            
            <div className="min-h-[150px]">
                {/* Loading State */}
                {isLoading && (
                    <div className="flex justify-center items-center h-full py-8 text-blue-600">
                        <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">...</svg>
                        Loading Bookings...
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="text-center py-8 text-red-500">
                        <Frown className="w-6 h-6 mx-auto mb-2" />
                        <p>{error}</p>
                    </div>
                )}
                
                {/* No Bookings State */}
                {!isLoading && !error && appointments.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        <p className="font-medium">You have no upcoming confirmed sessions.</p>
                        <p className="text-sm mt-1">Visit the Support Page to book one!</p>
                    </div>
                )}

                {/* Displaying Appointments */}
                {!isLoading && appointments.length > 0 && (
                    <div>
                        {appointments.map((item, index) => (
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
        </div>
    );
};

export default UpcomingAppointments;