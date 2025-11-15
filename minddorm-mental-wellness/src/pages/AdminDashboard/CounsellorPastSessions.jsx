import React, { useEffect, useState } from "react";
import axios from "axios";
import { parseISO, format as formatDate } from "date-fns";

const CounsellorPastSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No authentication token found");
      setLoading(false);
      return;
    }
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      const res = await axios.get("http://localhost:5050/api/staff/my-past-sessions", config);
      if (res.data && res.data.pastSessions) {
        setSessions(res.data.pastSessions);
      } else {
        setError("No sessions data received");
      }
    } catch (err) {
      console.error("Error fetching past sessions:", err);
      setError(err.response?.data?.error || err.message || "Failed to fetch sessions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="bg-white mt-10 p-6 border rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4 text-[#000459]">My Past Sessions</h2>
        <p className="text-gray-500 text-center py-8">Loading past sessions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white mt-10 p-6 border rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4 text-[#000459]">My Past Sessions</h2>
        <p className="text-red-600 text-center py-4">{error}</p>
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <div className="bg-white mt-10 p-6 border rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4 text-[#000459]">My Past Sessions</h2>
        <p className="text-gray-500 text-center py-8">No past sessions to display.</p>
      </div>
    );
  }

  // Show only 5 unless expanded
  const visibleSessions = showAll ? sessions : sessions.slice(0, 5);

  const formatSessionDate = (dateStr) => {
    try {
      const date = parseISO(dateStr);
      return formatDate(date, 'MMM dd, yyyy');
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div className="bg-white mt-10 p-6 border rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4 text-[#000459]">
        My Past Sessions ({sessions.length})
      </h2>

      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-[#E5F3FF]">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Time</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Student Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {visibleSessions.map((s, index) => (
            <tr key={index} className="hover:bg-indigo-50">
              <td className="px-6 py-3 text-sm">{formatSessionDate(s.date)}</td>
              <td className="px-6 py-3 text-sm">{s.time}</td>
              <td className="px-6 py-3 text-sm text-[#7F56D9] font-medium">{s.student_email || 'N/A'}</td>
              <td className="px-6 py-3">
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  {s.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* VIEW MORE / LESS BUTTON */}
      {sessions.length > 5 && (
        <div className="text-center mt-4">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition"
          >
            {showAll ? "View Less" : "View More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default CounsellorPastSessions;
