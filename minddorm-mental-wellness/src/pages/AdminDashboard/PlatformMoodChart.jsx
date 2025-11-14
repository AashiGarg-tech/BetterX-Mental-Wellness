import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { startOfWeek, subWeeks, addDays, format as formatDate } from 'date-fns';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

const PlatformMoodChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMoodTrend = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

        const res = await axios.get('http://localhost:5050/api/admin/mood-trend', config);

        if (res.data && res.data.success && Array.isArray(res.data.data)) {
          // Build continuous 12-week series and map api results
          const apiMap = new Map(res.data.data.map((r) => [r.week_start, { avg_mood: parseFloat(r.avg_mood), entries: r.entries }]));
          const weeks = [];
          for (let i = 11; i >= 0; i--) {
            const wkStartDate = startOfWeek(subWeeks(new Date(), i), { weekStartsOn: 1 });
            const wkEndDate = addDays(wkStartDate, 6);
            const wkKey = formatDate(wkStartDate, 'yyyy-MM-dd');
            const label = `${formatDate(wkStartDate, 'MMM dd')} - ${formatDate(wkEndDate, 'MMM dd')}`;
            const apiVal = apiMap.get(wkKey);
            weeks.push({ week: wkKey, weekLabel: label, avg_mood: apiVal ? apiVal.avg_mood : null, entries: apiVal ? apiVal.entries : 0 });
          }
          setData(weeks);
        } else {
          setData([]);
        }
      } catch (err) {
        console.error('Failed to fetch mood trend:', err.message || err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMoodTrend();
  }, []);

  if (loading) return <div className="p-6 text-gray-500">Loading mood chart...</div>;
  if (!data || data.length === 0) return <div className="p-6 text-gray-500">No mood data available.</div>;

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || payload.length === 0) return null;
    const point = payload[0].payload;
    return (
      <div className="bg-white p-2 rounded shadow">
        <div className="text-sm font-medium">{label}</div>
        <div className="text-xs text-gray-600">Average mood: {point.avg_mood !== null ? point.avg_mood : '—'}</div>
        <div className="text-xs text-gray-600">Entries: {point.entries}</div>
      </div>
    );
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="weekLabel" />
        <YAxis domain={[1, 5]} allowDecimals={false} />
        <Tooltip content={<CustomTooltip />} />
        <Line type="monotone" dataKey="avg_mood" stroke="#4CAF50" strokeWidth={2} dot={{ r: 3 }} connectNulls={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PlatformMoodChart;
