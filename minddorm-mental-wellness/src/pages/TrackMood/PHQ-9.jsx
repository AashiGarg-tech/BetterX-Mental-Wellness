import React, { useState } from "react";
import { ArrowLeft, CheckCircle } from "lucide-react";
import apiClient from "../../utils/apiClient";

const PHQ9Assessment = () => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false); // 👈 NEW
  const [saveError, setSaveError] = useState(null); // 👈 NEW

  const questions = [
    { id: 1, text: "Little interest or pleasure in doing things" },
    { id: 2, text: "Feeling down, depressed, or hopeless" },
    { id: 3, text: "Trouble falling or staying asleep, or sleeping too much" },
    { id: 4, text: "Feeling tired or having little energy" },
    { id: 5, text: "Poor appetite or overeating" },
    { id: 6, text: "Feeling bad about yourself — or that you are a failure or have let yourself or your family down" },
    { id: 7, text: "Trouble concentrating on things, such as reading the newspaper or watching television" },
    { id: 8, text: "Moving or speaking so slowly that other people could have noticed. Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual" },
    { id: 9, text: "Thoughts that you would be better off dead, or of hurting yourself in some way" }
  ];

  const options = [
    { value: 0, label: "Not at all" },
    { value: 1, label: "Several days" },
    { value: 2, label: "More than half the days" },
    { value: 3, label: "Nearly every day" }
  ];

  const handleAnswer = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const calculateScore = () => {
    return Object.values(answers).reduce((sum, val) => sum + val, 0);
  };

  const getInterpretation = (score) => {
    if (score <= 4) return { 
      level: "Minimal Depression", 
      color: "text-green-600", 
      bg: "bg-green-50",
      border: "border-green-500", // Added border for consistency
      message: "Your responses suggest minimal or no depression. Continue monitoring your well-being."
    };
    if (score <= 9) return { 
      level: "Mild Depression", 
      color: "text-yellow-600", 
      bg: "bg-yellow-50",
      border: "border-yellow-500", // Added border for consistency
      message: "Your responses suggest mild depression. Consider self-care strategies and monitoring symptoms."
    };
    if (score <= 14) return { 
      level: "Moderate Depression", 
      color: "text-orange-600", 
      bg: "bg-orange-50",
      border: "border-orange-500", // Added border for consistency
      message: "Your responses suggest moderate depression. Consider speaking with a mental health professional."
    };
    if (score <= 19) return { 
      level: "Moderately Severe Depression", 
      color: "text-red-600", 
      bg: "bg-red-50",
      border: "border-red-500", // Added border for consistency
      message: "Your responses suggest moderately severe depression. Professional support is recommended."
    };
    return { 
      level: "Severe Depression", 
      color: "text-red-700", 
      bg: "bg-red-100",
      border: "border-red-700", // Added border for consistency
      message: "Your responses suggest severe depression. Please seek professional help as soon as possible."
    };
  };

  // Save assessment using apiClient with automatic token refresh
  const saveAssessment = async (score, interpretation) => {
    const assessmentData = {
      assessment_type: "PHQ-9",
      score: score,
      score_level: interpretation.level,
    };

    try {
      const response = await apiClient.fetchWithAuth("/api/assessment/assessments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(assessmentData),
      });
      
      // Handle 409 Conflict for the one-per-day restriction
      if (response.status === 409) {
        const errorBody = await response.json();
        throw new Error(errorBody.message);
      }

      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.message || "Failed to save assessment score.");
      }

      console.log("PHQ-9 Assessment saved successfully!");
      return true;
    } catch (error) {
      console.error("Error saving PHQ-9 score:", error);
      setSaveError(error.message || "Network error while saving score.");
      return false;
    }
  };

  // 🎯 NEW: Async handleSubmit with API call and validation
  const handleSubmit = async () => {
    if (Object.keys(answers).length !== questions.length) {
      setSaveError("Please answer all questions before submitting.");
      return; 
    }
    
    const score = calculateScore();
    const interpretation = getInterpretation(score);

    setIsSaving(true);
    setSaveError(null); // Clear previous errors
    
    const success = await saveAssessment(score, interpretation);
    
    setIsSaving(false);

    if (success) {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };


  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setSaveError(null); // Reset error state
  };

  const handleBack = () => {
    window.history.back();
  };


  if (submitted) {
    const score = calculateScore();
    const interpretation = getInterpretation(score);
    const hasQuestion9 = answers[9] > 0;

    // Helper function to extract border color
    const interpretationBorder = interpretation.border || `border-${interpretation.color.split('-')[1]}-500`;

    return (
      <div className="min-h-screen font-sans bg-gradient-to-b from-[#B5D8EB] to-[#F4F8FB] py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
            <div className="text-center space-y-4">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
              <h2 className="text-3xl font-bold text-[#000459]">Assessment Complete</h2>
            </div>

            <div className={`${interpretation.bg} border-l-4 ${interpretationBorder} p-6 rounded-lg`}>
              <h3 className={`text-2xl font-bold ${interpretation.color} mb-2`}>
                Your Score: {score}/27
              </h3>
              <p className={`text-lg font-semibold ${interpretation.color} mb-3`}>
                {interpretation.level}
              </p>
              <p className="text-gray-700">{interpretation.message}</p>
            </div>

            {hasQuestion9 && (
              <div className="bg-red-100 border-l-4 border-red-600 p-4 rounded-lg">
                <p className="text-red-800 font-semibold mb-2">⚠️ Important Notice</p>
                <p className="text-sm text-red-700">
                  You indicated thoughts of self-harm. Please reach out to a mental health professional immediately or contact a crisis helpline:
                </p>
                <div className="mt-3 space-y-1 text-sm text-red-700">
                  <p><strong>National Crisis Helpline (India):</strong> 9152987821</p>
                  <p><strong>Vandrevala Foundation:</strong> 1860-2662-345</p>
                  <p><strong>iCall:</strong> 9152987821</p>
                </div>
              </div>
            )}

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Note:</strong> This assessment is a screening tool and not a diagnosis. 
                Please consult with a qualified mental health professional for proper evaluation and support.
              </p>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 bg-[#5AA7E8] hover:bg-[#3F8BD1] text-white rounded-full font-medium transition-transform hover:scale-105"
              >
                Take Again
              </button>
              <button
                onClick={handleBack}
                className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full font-medium transition-transform hover:scale-105"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans bg-gradient-to-b from-[#B5D8EB] to-[#F4F8FB] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-[#5AA7E8] hover:text-[#3F8BD1] mb-6 font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-4xl font-bold text-[#000459]">
              Patient Health Questionnaire (PHQ-9)
            </h1>
            <p className="text-gray-600">
              This questionnaire screens for depression symptoms over the past two weeks.
            </p>
            <div className="bg-[#D6EAF4] border-l-4 border-[#5AA7E8] p-4 rounded-lg text-sm text-gray-700 text-left">
              <strong>Instructions:</strong> Over the last 2 weeks, how often have you been bothered by any of the following problems?
            </div>
          </div>
          
          {/* 🎯 NEW: Error Message Display */}
          {saveError && (
              <div className="bg-red-100 text-red-700 p-3 rounded-lg text-center mb-6">
                  Error saving score: {saveError}
              </div>
          )}

          <div className="space-y-6">
            {questions.map((question, index) => (
              <div key={question.id} className="bg-gray-50 rounded-xl p-6 space-y-4">
                <h3 className="font-semibold text-gray-800">
                  {index + 1}. {question.text}
                </h3>
                <div className="space-y-2">
                  {options.map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-white cursor-pointer transition-colors"
                    >
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={String(option.value)}
                        checked={answers[question.id] === option.value}
                        onChange={(e) => handleAnswer(question.id, Number(e.target.value))}
                        className="w-4 h-4 text-[#5AA7E8]"
                        disabled={isSaving} // 👈 NEW: Disable during save
                      />
                      <span className="text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={handleSubmit}
              disabled={isSaving} // 👈 NEW
              className={`px-10 py-3 text-white rounded-full font-medium transition-transform hover:scale-105 text-lg ${
                isSaving ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#5AA7E8] hover:bg-[#3F8BD1]' // 👈 NEW
              }`}
            >
              {isSaving ? 'Submitting...' : 'Submit Assessment'}
            </button>
            <p className="text-xs text-gray-500 mt-3">
              All responses are confidential and used only for your self-assessment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PHQ9Assessment;