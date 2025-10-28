import React, { useState, useEffect, useMemo } from 'react';
import { FileText, ChevronDown, Loader2 } from 'lucide-react';
import apiClient from '../../utils/apiClient';
import { format, subDays, isBefore } from 'date-fns';

// Constants
const MAX_VISIBLE_TESTS = 3;
const WEEKLY_REFRESH_DAYS = 7;

// Map of Max Scores for context
const MAX_SCORES = {
  'GAD-7': 21,
  'PHQ-9': 27,
  'PSS': 40,
};

// --- Helper Component ---
const AssessmentRow = ({ name, date, score, scoreLevel, maxScore }) => {
  let bgColor = 'bg-blue-100';
  let textColor = 'text-blue-600';

  // 🎯 MODIFIED LOGIC: Use explicit checks to assign colors based on severity
  if (scoreLevel.includes('Severe') || scoreLevel.includes('High')) {
    // Red for Severe/High
    bgColor = 'bg-red-100';
    textColor = 'text-red-600';
  } else if (scoreLevel.includes('Moderate')) {
    // Orange/Red for Moderate (Using Red for strong dashboard alert)
    bgColor = 'bg-red-100';
    textColor = 'text-red-600';
  } else if (scoreLevel.includes('Mild')) {
    // Yellow for Mild categories (Distinguish from Minimal)
    bgColor = 'bg-yellow-100';
    textColor = 'text-yellow-600';
  }
  // All 'Minimal' scores will remain the default Blue (low/healthy risk)

  return (
    <div className="flex justify-between items-center py-3 border-b last:border-b-0">
      <div>
        <p className="text-gray-800 font-medium">{name}</p>
        <p className="text-sm text-gray-500">{format(new Date(date), 'MMM do, yyyy')}</p>
      </div>
      <div className="text-right">
        <span 
          className={`font-semibold text-sm px-3 py-1 rounded-full whitespace-nowrap ${bgColor} ${textColor}`}
        >
          Score: {score}/{maxScore}
        </span>
        <p className={`text-xs mt-0.5 ${textColor}`}>
            {scoreLevel}
        </p>
      </div>
    </div>
  );
};

// --- Main Component ---
const AssessmentHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);

  // Use localStorage to manage the refresh timer
  const lastFetchKey = 'lastAssessmentFetch';

  const fetchAssessmentHistory = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiClient.fetchWithAuth("/api/assessment/history");

      if (!response.ok) {
        throw new Error("Failed to fetch assessment history.");
      }

      const data = await response.json();
      
      // Ensure data is sorted by taken_at descending (latest first)
      const sortedHistory = data.sort((a, b) => new Date(b.taken_at) - new Date(a.taken_at));
      
      setHistory(sortedHistory);
      localStorage.setItem(lastFetchKey, new Date().toISOString());
    
    } catch (err) {
      console.error("Error fetching assessment history:", err);
      setError(err.message || "Could not load history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const lastFetchTime = localStorage.getItem(lastFetchKey);
    const sevenDaysAgo = subDays(new Date(), WEEKLY_REFRESH_DAYS);

    // Fetch if never fetched or last fetch was more than 7 days ago
    if (!lastFetchTime || isBefore(new Date(lastFetchTime), sevenDaysAgo)) {
      fetchAssessmentHistory();
    } else {
      fetchAssessmentHistory();
    }
  }, []); 

  // Memoize the list of items to display (either 3 or all)
  const itemsToDisplay = useMemo(() => {
    return showAll ? history : history.slice(0, MAX_VISIBLE_TESTS);
  }, [history, showAll]);


  if (loading) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 text-center">
            <Loader2 className="w-6 h-6 animate-spin mx-auto text-[#5AA7E8]" />
            <p className="mt-2 text-sm text-gray-600">Loading history...</p>
        </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
      <div className="flex items-center space-x-2 mb-4">
        <FileText className="text-gray-600 w-5 h-5" />
        <h2 className="text-xl font-semibold text-gray-800">Assessment History</h2>
      </div>
      
      {error && (
        <div className="text-red-600 bg-red-50 p-3 rounded-lg text-sm mb-4">
            {error}
        </div>
      )}

      {history.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No assessment history found.</p>
      ) : (
        <div>
          {itemsToDisplay.map((item, index) => (
            <AssessmentRow 
              key={item.id || index}
              name={item.assessment_type}
              date={item.taken_at}
              score={item.score}
              scoreLevel={item.score_level}
              maxScore={MAX_SCORES[item.assessment_type] || '?'} 
            />
          ))}

          {/* View More button logic */}
          {history.length > MAX_VISIBLE_TESTS && (
            <div className="mt-4 pt-4 border-t border-gray-100 text-center">
              <button 
                onClick={() => setShowAll(!showAll)}
                className="text-[#5AA7E8] hover:text-[#3F8BD1] font-medium flex items-center justify-center mx-auto text-sm"
              >
                {showAll ? 'View Less' : `View More (${history.length - MAX_VISIBLE_TESTS} hidden)`}
                <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${showAll ? 'rotate-180' : ''}`} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AssessmentHistory;