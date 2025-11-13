import React, { useEffect, useState } from "react";
import axios from "axios";

const PastSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [selectedCounsellor, setSelectedCounsellor] = useState(""); // NEW FILTER STATE

  const fetchPastSessions = async () => {
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      const res = await axios.get("http://localhost:5050/api/admin/past-sessions", config);
      setSessions(res.data.pastSessions);
    } catch (err) {
      console.error("Error loading admin past sessions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPastSessions();
  }, []);

  if (loading) return <p className="text-gray-500">Loading past sessions...</p>;

  if (sessions.length === 0)
    return (
      <p className="text-center text-gray-500 mt-6">
        No past sessions available.
      </p>
    );

  // Extract counsellor names dynamically (no hardcoding)
  const counsellorNames = Array.from(
    new Set(sessions.map((s) => s.counsellor_name))
  );

  // FILTER LOGIC
  const filteredSessions = selectedCounsellor
    ? sessions.filter((s) => s.counsellor_name === selectedCounsellor)
    : sessions;

  // Only show 10 unless expanded
  const visibleSessions = showAll
    ? filteredSessions
    : filteredSessions.slice(0, 10);

  return (
    <div className="bg-white p-6 rounded-xl border shadow mt-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-[#000459]">
          Past Counselling Sessions
        </h2>

        {/* COUNSELLOR FILTER DROPDOWN */}
        <select
          value={selectedCounsellor}
          onChange={(e) => {
            setSelectedCounsellor(e.target.value);
            setShowAll(false); // Reset view more when switching counsellor
          }}
          className="border p-2 rounded-md text-sm"
        >
          <option value="">All Counsellors</option>
          {counsellorNames.map((name, i) => (
            <option key={i} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-[#E5F3FF]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Counsellor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Status</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {visibleSessions.map((s, i) => (
              <tr key={i} className="hover:bg-indigo-50">
                <td className="px-6 py-3">{s.date}</td>
                <td className="px-6 py-3">{s.time}</td>
                <td className="px-6 py-3">{s.counsellor_name}</td>
                <td className="px-6 py-3">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                    {s.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* View More / Less button */}
      {filteredSessions.length > 10 && (
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

export default PastSessions;
