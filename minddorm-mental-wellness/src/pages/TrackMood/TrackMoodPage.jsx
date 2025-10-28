
// import React, { useState } from "react";
// import { Smile, Meh, Frown, CloudRain, Moon } from "lucide-react";
// import { useNavigate } from "react-router-dom"; 

// // Placeholder function for the user ID. 
// const getUserId = () => {
//     // NOTE: Replace this mock ID with the actual ID from your authentication state!
//     return '66f3e1b7f3d5b0a8c2f218a0'; 
// };

// const TrackMoodPage = () => {
//     const navigate = useNavigate();
    
//     const [selectedMood, setSelectedMood] = useState(null);
//     const [note, setNote] = useState("");
//     const [message, setMessage] = useState(''); // State for success/error messages

//     const API_URL = "http://localhost:5050/api/moods/track"; // Corrected backend endpoint

//     const moods = [
//         { id: 1, name: "Happy", icon: <Smile className="w-8 h-8 text-yellow-500" /> },
//         { id: 2, name: "Calm", icon: <Moon className="w-8 h-8 text-[#5AA7E8]" /> },
//         { id: 3, name: "Neutral", icon: <Meh className="w-8 h-8 text-gray-500" /> },
//         { id: 4, name: "Sad", icon: <Frown className="w-8 h-8 text-blue-500" /> },
//         { id: 5, name: "Anxious", icon: <CloudRain className="w-8 h-8 text-teal-500" /> },
//     ];

//     // --- MODIFIED HANDLE SAVE FUNCTION TO CHECK FOR 403 ERROR ---
//     const handleSave = async () => {
//         if (!selectedMood) {
//             setMessage({ type: 'error', text: 'Please select a mood before saving.' });
//             return;
//         }

//         const userId = getUserId(); 
//         if (!userId) {
//             setMessage({ type: 'error', text: 'Authentication error: User ID not found.' });
//             return;
//         }

//         setMessage({ type: 'info', text: 'Saving reflection...' });
        
//         try {
//             const response = await fetch(API_URL, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     // IMPORTANT: Include Authorization header here when authentication is enabled
//                 },
//                 body: JSON.stringify({
//                     userId: userId, // Pass mock ID for current backend setup
//                     mood: selectedMood.name,
//                     note: note,
//                 }),
//             });

//             const data = await response.json();

//             if (!response.ok) {
//                 // ----------------------------------------------------
//                 // NEW LOGIC: Handle 24-HOUR Restriction Error (403)
//                 // ----------------------------------------------------
//                 if (response.status === 403 && data.restriction) {
//                     // Use the detailed message sent by the backend (e.g., "Please wait 5 hours...")
//                     throw new Error(data.message); 
//                 }
                
//                 // Handle other errors (400 validation, 500 server error, etc.)
//                 throw new Error(data.message || `Failed to save mood (Status: ${response.status}).`);
//             }

//             // Success
//             setMessage({ type: 'success', text: `Mood "${selectedMood.name}" saved successfully!` });
//             setSelectedMood(null);
//             setNote("");

//         } catch (error) {
//             console.error("API Save Error:", error);
//             // Display the specific error message (including the restriction message) to the user
//             setMessage({ type: 'error', text: `${error.message}` }); 
//         }
//     };

//     const assessments = [
//         {
//             name: "PSS (Perceived Stress Scale)",
//             route: "/PSSAssessment",
//             when: "If you often feel overwhelmed or pressured.",
//             result: "Measures how stressful your life currently feels.",
//         },
//         {
//             name: "PHQ-9 (Depression Test)",
//             route: "/PHQ9Assessment",
//             when: "When you feel low, tired, or lose interest in activities.",
//             result: "Screens for depression symptoms and their severity.",
//         },
//         {
//             name: "GAD-7 (Anxiety Test)",
//             route: "/GAD7Assessment",
//             when: "If you often worry, feel tense, or restless.",
//             result: "Assesses anxiety levels and emotional impact.",
//         },
//     ];

//     const getMessageClass = () => {
//         if (!message) return 'hidden';
//         switch (message.type) {
//             case 'success': return 'bg-green-100 border-green-400 text-green-700';
//             case 'error': return 'bg-red-100 border-red-400 text-red-700';
//             default: return 'bg-blue-100 border-blue-400 text-blue-700';
//         }
//     };

//     return (
//         <div className="min-h-screen font-sans bg-gradient-to-b from-[#B5D8EB] to-[#F4F8FB]">
//             <main className="container mx-auto px-4 py-8 space-y-6">
//                 {/* Header */}
//                 <div className="text-center space-y-4">
//                     <h1 className="text-5xl font-semibold text-[#000459] leading-snug">
//                         Your Feelings Deserve Space
//                     </h1>
//                     <p className="text-lg text-gray-600">
//                         Track your mood, reflect gently, and explore assessments that support your emotional wellness—without judgment.
//                     </p>
//                     <p className="text-sm italic text-gray-500">
//                         "Even on quiet days, your emotions speak. Listening is healing."
//                     </p>
//                 </div>

//                 {/* Mood Tracker */}
//                 <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-6">
//                     <div className="text-center">
//                         <h2 className="text-3xl font-semibold text-[#000459] mb-2">
//                             Select a Mood That Resonates
//                         </h2>
//                         <p className="text-sm text-gray-500">
//                             Tap a mood and write a short note to reflect on your day.
//                         </p>
//                     </div>

//                     <div className="flex justify-center gap-6 flex-wrap relative z-10">
//                         {moods.map((mood) => (
//                             <button
//                                 key={mood.id}
//                                 onClick={() => setSelectedMood(mood)}
//                                 className={`flex flex-col items-center gap-2 p-6 rounded-xl border transition-all transform hover:scale-105 ${
//                                     selectedMood?.id === mood.id
//                                         ? "bg-[#D6EAF4] border-[#5AA7E8] shadow-md scale-105"
//                                         : "bg-gradient-to-b from-gray-50 to-white hover:from-[#E3F2FA] hover:to-[#F5FAFD] border-gray-200"
//                                 }`}
//                             >
//                                 <div className="w-12 h-12 flex items-center justify-center">
//                                     {mood.icon}
//                                 </div>
//                                 <span className="text-sm font-medium text-gray-700">{mood.name}</span>
//                             </button>
//                         ))}
//                     </div>
                    
//                     {/* Status Message */}
//                     <div className={`p-3 border rounded-lg text-sm transition-all ${getMessageClass()}`}>
//                         {message.text}
//                     </div>

//                     <textarea
//                         value={note}
//                         onChange={(e) => setNote(e.target.value)}
//                         placeholder="What’s been on your mind today? Any small wins or challenges?"
//                         className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#5AA7E8] outline-none resize-none"
//                         rows={3}
//                     />

//                     <div className="text-center">
//                         <button
//                             onClick={handleSave}
//                             className={`bg-[#5AA7E8] hover:bg-[#3F8BD1] text-white px-8 py-2.5 rounded-full font-medium transition-transform hover:scale-105 ${!selectedMood ? 'opacity-50 cursor-not-allowed' : ''}`}
//                             disabled={!selectedMood}
//                         >
//                             Save Reflection
//                         </button>
//                     </div>
//                 </div>

//                 {/* Assessments (Navigation logic remains the same) */}
//                 <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-10 space-y-6">
//                     <div className="text-center space-y-2">
//                         <h2 className="text-3xl font-bold text-[#000459]">Gentle Self-Assessments</h2>
//                         <p className="text-md text-gray-600 max-w-3xl mx-auto">
//                             These tools are here to help you understand your emotional patterns. Take them when you feel ready.
//                         </p>
//                     </div>

//                     <div className="grid md:grid-cols-3 gap-6">
//                         {assessments.map((test, index) => (
//                             <div
//                                 key={index}
//                                 onClick={() => navigate(test.route)} 
//                                 className="p-6 bg-gradient-to-b from-gray-50 to-white hover:from-[#E3F2FA] hover:to-[#F5FAFD] rounded-xl border border-gray-100 transition-all shadow-sm space-y-3 transform hover:scale-[1.02] hover:shadow-md cursor-pointer"
//                             >
//                                 <h3 className="text-lg font-semibold text-[#5AA7E8]">{test.name}</h3>
//                                 <p className="text-sm text-gray-700"><strong>When to take:</strong> {test.when}</p>
//                                 <p className="text-sm text-gray-700"><strong>Purpose:</strong> {test.result}</p>
//                                 <div className="inline-flex items-center gap-2 mt-2 px-5 py-2 bg-[#5AA7E8] hover:bg-[#3F8BD1] text-white text-sm font-medium rounded-full">
//                                     Begin Assessment →
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 <footer className="text-center mt-10 text-gray-600 text-sm">
//                     <p>Don't worry Be happy</p>
//                 </footer>
//             </main>
//         </div>
//     );
// };

// export default TrackMoodPage;




import React, { useState } from "react";
import apiClient from '../../utils/apiClient';
import { Smile, Meh, Frown, CloudRain, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom"; 

const TrackMoodPage = () => {
    const navigate = useNavigate();
    
    const [selectedMood, setSelectedMood] = useState(null);
    const [note, setNote] = useState("");
    const [message, setMessage] = useState('');

    const API_URL = '/api/mood/entry';

    const moods = [
        { id: 1, name: "Happy", rating: 5, icon: <Smile className="w-8 h-8 text-yellow-500" /> },
        { id: 2, name: "Calm", rating: 4, icon: <Moon className="w-8 h-8 text-[#5AA7E8]" /> },
        { id: 3, name: "Neutral", rating: 3, icon: <Meh className="w-8 h-8 text-gray-500" /> },
        { id: 4, name: "Sad", rating: 2, icon: <Frown className="w-8 h-8 text-blue-500" /> },
        { id: 5, name: "Anxious", rating: 1, icon: <CloudRain className="w-8 h-8 text-teal-500" /> },
    ];

    const handleSave = async () => {
        if (!selectedMood) {
            setMessage({ type: 'error', text: 'Please select a mood before saving.' });
            return;
        }

        // prefer accessToken (new), fallback to legacy `token`
        const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
        if (!token) {
            setMessage({ type: 'error', text: 'Please login to save your mood.' });
            return;
        }

        setMessage({ type: 'info', text: 'Saving reflection...' });
        
        try {

            const response = await apiClient.fetchWithAuth(API_URL, {
                method: "POST",
                body: JSON.stringify({
                    mood_rating: selectedMood.rating,
                    notes: note,
                    check_in_date: new Date().toISOString().split('T')[0]
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || `Failed to save mood (Status: ${response.status}).`);
            }

            // Success
            setMessage({ type: 'success', text: `Mood "${selectedMood.name}" saved successfully! ✨` });
            
            // Clear form after 2 seconds and optionally redirect
            setTimeout(() => {
                setSelectedMood(null);
                setNote("");
                setMessage('');
                // Optionally redirect to dashboard
                // navigate('/dashboard');
            }, 2000);

        } catch (error) {
            console.error("API Save Error:", error);
            setMessage({ type: 'error', text: `${error.message}` }); 
        }
    };

    const assessments = [
        {
            name: "PSS (Perceived Stress Scale)",
            route: "/PSSAssessment",
            when: "If you often feel overwhelmed or pressured.",
            result: "Measures how stressful your life currently feels.",
        },
        {
            name: "PHQ-9 (Depression Test)",
            route: "/PHQ9Assessment",
            when: "When you feel low, tired, or lose interest in activities.",
            result: "Screens for depression symptoms and their severity.",
        },
        {
            name: "GAD-7 (Anxiety Test)",
            route: "/GAD7Assessment",
            when: "If you often worry, feel tense, or restless.",
            result: "Assesses anxiety levels and emotional impact.",
        },
    ];

    const getMessageClass = () => {
        if (!message) return 'hidden';
        switch (message.type) {
            case 'success': return 'bg-green-100 border-green-400 text-green-700';
            case 'error': return 'bg-red-100 border-red-400 text-red-700';
            default: return 'bg-blue-100 border-blue-400 text-blue-700';
        }
    };

    return (
        <div className="min-h-screen font-sans bg-gradient-to-b from-[#B5D8EB] to-[#F4F8FB]">
            <main className="container mx-auto px-4 py-8 space-y-6">
                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-5xl font-semibold text-[#000459] leading-snug">
                        Your Feelings Deserve Space
                    </h1>
                    <p className="text-lg text-gray-600">
                        Track your mood, reflect gently, and explore assessments that support your emotional wellness—without judgment.
                    </p>
                    <p className="text-sm italic text-gray-500">
                        "Even on quiet days, your emotions speak. Listening is healing."
                    </p>
                </div>

                {/* Mood Tracker */}
                <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-6">
                    <div className="text-center">
                        <h2 className="text-3xl font-semibold text-[#000459] mb-2">
                            Select a Mood That Resonates
                        </h2>
                        <p className="text-sm text-gray-500">
                            Tap a mood and write a short note to reflect on your day.
                        </p>
                    </div>

                    <div className="flex justify-center gap-6 flex-wrap relative z-10">
                        {moods.map((mood) => (
                            <button
                                key={mood.id}
                                onClick={() => setSelectedMood(mood)}
                                className={`flex flex-col items-center gap-2 p-6 rounded-xl border transition-all transform hover:scale-105 ${
                                    selectedMood?.id === mood.id
                                        ? "bg-[#D6EAF4] border-[#5AA7E8] shadow-md scale-105"
                                        : "bg-gradient-to-b from-gray-50 to-white hover:from-[#E3F2FA] hover:to-[#F5FAFD] border-gray-200"
                                }`}
                            >
                                <div className="w-12 h-12 flex items-center justify-center">
                                    {mood.icon}
                                </div>
                                <span className="text-sm font-medium text-gray-700">{mood.name}</span>
                            </button>
                        ))}
                    </div>
                    
                    {/* Status Message */}
                    {message && (
                        <div className={`p-3 border rounded-lg text-sm transition-all ${getMessageClass()}`}>
                            {message.text}
                        </div>
                    )}

                    <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="What's been on your mind today? Any small wins or challenges?"
                        className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#5AA7E8] outline-none resize-none"
                        rows={3}
                    />

                    <div className="text-center">
                        <button
                            onClick={handleSave}
                            className={`bg-[#5AA7E8] hover:bg-[#3F8BD1] text-white px-8 py-2.5 rounded-full font-medium transition-transform hover:scale-105 ${!selectedMood ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={!selectedMood}
                        >
                            Save Reflection
                        </button>
                    </div>
                </div>

                {/* Assessments */}
                <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-10 space-y-6">
                    <div className="text-center space-y-2">
                        <h2 className="text-3xl font-bold text-[#000459]">Gentle Self-Assessments</h2>
                        <p className="text-md text-gray-600 max-w-3xl mx-auto">
                            These tools are here to help you understand your emotional patterns. Take them when you feel ready.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {assessments.map((test, index) => (
                            <div
                                key={index}
                                onClick={() => navigate(test.route)} 
                                className="p-6 bg-gradient-to-b from-gray-50 to-white hover:from-[#E3F2FA] hover:to-[#F5FAFD] rounded-xl border border-gray-100 transition-all shadow-sm space-y-3 transform hover:scale-[1.02] hover:shadow-md cursor-pointer"
                            >
                                <h3 className="text-lg font-semibold text-[#5AA7E8]">{test.name}</h3>
                                <p className="text-sm text-gray-700"><strong>When to take:</strong> {test.when}</p>
                                <p className="text-sm text-gray-700"><strong>Purpose:</strong> {test.result}</p>
                                <div className="inline-flex items-center gap-2 mt-2 px-5 py-2 bg-[#5AA7E8] hover:bg-[#3F8BD1] text-white text-sm font-medium rounded-full">
                                    Begin Assessment →
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <footer className="text-center mt-10 text-gray-600 text-sm">
                    <p>Don't worry Be happy</p>
                </footer>
            </main>
        </div>
    );
};

export default TrackMoodPage;