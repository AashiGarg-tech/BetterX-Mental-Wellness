import React, { useEffect, useState } from "react";
import axios from "axios";

const CounsellorPastSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false); // NEW STATE

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      const res = await axios.get("http://localhost:5050/api/staff/my-past-sessions", config);
      setSessions(res.data.pastSessions);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p className="text-gray-500">Loading past sessions...</p>;

  if (sessions.length === 0)
    return <p className="text-gray-500 text-center mt-4">No past sessions.</p>;

  // Show only 5 unless expanded
  const visibleSessions = showAll ? sessions : sessions.slice(0, 5);

  return (
    <div className="bg-white mt-10 p-6 border rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4 text-[#000459]">
        My Past Sessions
      </h2>

      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-[#E5F3FF]">
          <tr>
            <th className="px-6 py-2 text-left text-xs font-medium text-gray-700">Date</th>
            <th className="px-6 py-2 text-left text-xs font-medium text-gray-700">Time</th>
            <th className="px-6 py-2 text-left text-xs font-medium text-gray-700">Status</th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {visibleSessions.map((s, index) => (
            <tr key={index} className="hover:bg-indigo-50">
              <td className="px-6 py-2">{s.date}</td>
              <td className="px-6 py-2">{s.time}</td>
              <td className="px-6 py-2">
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
