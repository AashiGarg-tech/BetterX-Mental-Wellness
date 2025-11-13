import React, { useState, useEffect } from 'react';
import { UserCircle, BookOpen, Clock, Calendar, Frown } from 'lucide-react';
import apiClient from '../../utils/apiClient';

const MAX_VISIBLE = 3;

// --- Helper Function ---
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

// --- Single Row Component ---
const SessionRow = ({ doctorName, sessionDate, sessionTime, bookingId }) => {
    const handleViewSummary = () => {
        console.log(`Viewing summary for booking ID: ${bookingId}`);
    };

    return (
        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg mb-3 last:mb-0 border border-gray-100">
            <div className="flex items-center space-x-3">
                <UserCircle className="w-10 h-10 text-blue-500" />
                <div>
                    <p className="text-gray-800 font-medium">{doctorName}</p>
                    <p className="text-sm text-gray-500 flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{sessionDate}</span>
                        <span className="mx-1">•</span>
                        <Clock className="w-3 h-3" />
                        <span>{sessionTime}</span>
                    </p>
                </div>
            </div>
            <button
                onClick={handleViewSummary}
                className="text-blue-600 text-sm font-semibold hover:text-blue-800 transition duration-150"
            >
                View Summary
            </button>
        </div>
    );
};

// --- Main Component ---
const PreviousSessionsSummary = () => {
    const [sessions, setSessions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // View More / View Less state
    const [visibleCount, setVisibleCount] = useState(MAX_VISIBLE);

    useEffect(() => {
        const fetchPreviousSessions = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await apiClient.fetchWithAuth('/api/bookings/my-past-sessions');

                if (!response.ok) {
                    throw new Error(`Failed to fetch sessions. Status: ${response.status}`);
                }

                const rawData = await response.json();

                setSessions(
                    rawData.map(session => {
                        const { formattedDate, formattedTime } = formatDateTime(
                            session.schedule_date,
                            session.schedule_time
                        );
                        return {
                            id: session.booking_id,
                            doctorName: session.counsellor_name,
                            date: formattedDate,
                            time: formattedTime,
                        };
                    })
                );
            } catch (err) {
                console.error("Failed to load previous sessions:", err);
                setError("Could not load past sessions. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchPreviousSessions();
    }, []);

    const showingAll = visibleCount >= sessions.length;

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="text-gray-600 w-5 h-5" />
                <h2 className="text-xl font-semibold text-gray-800">Previous Sessions Summary</h2>
            </div>

            <div className="min-h-[150px]">
                {/* Loading */}
                {isLoading && (
                    <div className="flex justify-center items-center h-full py-8 text-blue-600">
                        <Clock className="w-5 h-5 animate-spin mr-2" />
                        ... Loading Past Sessions...
                    </div>
                )}

                {/* Error */}
                {error && (
                    <div className="text-center py-8 text-red-500">
                        <Frown className="w-6 h-6 mx-auto mb-2" />
                        <p>{error}</p>
                    </div>
                )}

                {/* No Data */}
                {!isLoading && !error && sessions.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        <p className="font-medium">No previous sessions found.</p>
                        <p className="text-sm mt-1">Check back after your first session!</p>
                    </div>
                )}

                {/* Sessions List */}
                {!isLoading && sessions.length > 0 && (
                    <div className="divide-y divide-gray-100">
                        {sessions.slice(0, visibleCount).map(session => (
                            <SessionRow
                                key={session.id}
                                bookingId={session.id}
                                doctorName={session.doctorName}
                                sessionDate={session.date}
                                sessionTime={session.time}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* View More / View Less */}
            {!isLoading && sessions.length > MAX_VISIBLE && (
                <div className="text-center pt-3">
                    {showingAll ? (
                        <button
                            onClick={() => setVisibleCount(MAX_VISIBLE)}
                            className="text-sm text-blue-600 font-semibold hover:text-blue-800"
                        >
                            View Less
                        </button>
                    ) : (
                        <button
                            onClick={() => setVisibleCount(sessions.length)}
                            className="text-sm text-blue-600 font-semibold hover:text-blue-800"
                        >
                            View More ({sessions.length - MAX_VISIBLE} hidden)
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default PreviousSessionsSummary;
