import React, { useState, useEffect } from 'react';
import { Smile } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import apiClient from '../../utils/apiClient';

const MoodTrends = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const ChartContainer = ({ children }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 h-96">
      <div className="flex items-center space-x-2 mb-4">
        <Smile className="text-gray-600 w-5 h-5" />
        <h2 className="text-xl font-semibold text-gray-800">Mood trends</h2>
      </div>
      <div className="h-4/5">{children}</div>
    </div>
  );

  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiClient.fetchWithAuth("/api/assessment/trends");

        if (!response.ok) {
          throw new Error(`Failed to fetch assessment trends. Status: ${response.status}`);
        }

        const json = await response.json();
        setData(json);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Could not load chart data. Ensure backend is running and you are logged in.");
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  if (loading) {
    return <ChartContainer><div className="flex justify-center items-center h-full text-gray-500">Loading mood trends...</div></ChartContainer>;
  }

  if (error) {
    return <ChartContainer><div className="flex justify-center items-center h-full text-red-500">{error}</div></ChartContainer>;
  }

  if (data.length === 0) {
    return <ChartContainer><div className="flex flex-col justify-center items-center h-full text-gray-500">No assessment data recorded yet.</div></ChartContainer>;
  }

  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="date" stroke="#6b7280" angle={-15} textAnchor="end" height={50} />
          <YAxis stroke="#6b7280" domain={[0, 21]} />
          <Tooltip contentStyle={{ borderRadius: '8px', border: 'none' }} />
          <Legend wrapperStyle={{ paddingTop: '10px' }} />

          <Line type="monotone" dataKey="phq9_score" name="PHQ-9" stroke="#10b981" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="gad7_score" name="GAD-7" stroke="#f59e0b" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="pss_score" name="PSS" stroke="#8b5cf6" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default MoodTrends;
