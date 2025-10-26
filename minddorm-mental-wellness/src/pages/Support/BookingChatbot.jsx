import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:5050/api'; 

// --- CONCEPTUAL AUTH HOOK (To be replaced with your actual hook) ---
// Note: This mock is required for the component to compile in isolation.
const useAuth = () => {
    // Reads the live token from storage
    const token = localStorage.getItem('authToken'); 
    
    // MOCK: User data derived from token payload
    const [user] = useState({ 
        token: token, 
        enrollment_number: '00101172024', 
        name: 'John Doe',
    }); 
    return { user };
};
// ------------------------------------------------------------------

// Component for a single chat message (unchanged)
const ChatMessage = ({ sender, text }) => (
    <div className={`flex ${sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-xl shadow-md ${
            sender === 'user' 
            ? 'bg-blue-600 text-white rounded-br-none' 
            : 'bg-gray-200 text-gray-800 rounded-tl-none'
        }`}>
            {text}
        </div>
    </div>
);

// --- API FUNCTIONS ---

const fetchRealAvailability = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/counsellors/availability`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error("Error fetching real availability:", error);
        return [];
    }
};

const submitRealBooking = async (bookingDetails, token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/bookings/create`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                schedule_id: bookingDetails.scheduleId, 
                student_name: bookingDetails.studentName,
            }),
        });
        
        return await response.json();
    } catch (error) {
        return { success: false, message: "A network error occurred while submitting the booking." };
    }
};

// --- Helper to process the large schedule data (HOISTED FOR COMPILATION) ---

const groupScheduleByDate = (rawData) => {
    const grouped = {};
    rawData.forEach(slot => {
        // Safe string conversion and null check
        if (!slot.schedule_date || !slot.schedule_time) return; 

        // FIX: Ensure value is a string before manipulation
        const date = String(slot.schedule_date).split('T')[0]; 
        const time = String(slot.schedule_time).substring(0, 5); 
        
        if (!grouped[date]) {
            grouped[date] = [];
        }
        
        grouped[date].push({
            schedule_id: slot.schedule_id,
            name: slot.name,
            title: slot.title,
            time: time === '10:00' ? '10 AM' : '3 PM', 
        });
    });
    return grouped;
};

// --- Helper for Formatting Messages (Hoisted) ---
const formatMessage = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g).map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={index}>{part.slice(2, -2)}</strong>;
        }
        const lines = part.split('\n');
        return lines.map((line, lineIndex) => (
            <React.Fragment key={`${index}-${lineIndex}`}>
                {line}
                {lineIndex < lines.length - 1 && <br />}
            </React.Fragment>
        ));
    });
    return parts;
};


// Main Booking Chatbot Component
const BookingChatbot = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const currentStudentId = user?.enrollment_number;
    const studentName = user?.name || "Student";
    const token = user?.token;

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    // Steps: 0: Initial, 1: Error/Auth Check, 2: Date Selection, 3: Slot Selection, 4: Confirmation, 5: Complete/End
    const [step, setStep] = useState(0); 
    const [bookingDetails, setBookingDetails] = useState({});
    const [groupedSchedule, setGroupedSchedule] = useState({});
    const [availableDates, setAvailableDates] = useState([]); 
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); };

    // Scroll effect
    useEffect(scrollToBottom, [messages]);


    // Initialize the chat: check auth, fetch schedule, and start at Step 2
    useEffect(() => {
        // 1. Initial Authentication Check
        if (!token || !currentStudentId) {
            setMessages([
                { sender: 'bot', text: "⚠️ Authentication required. Please ensure you are logged in." }
            ]);
            setStep(5); // Set to End state
            return;
        }

        // 2. Initialize state with secure, authenticated data
        setBookingDetails({ studentId: currentStudentId, studentName: studentName });

        const loadScheduleAndStartChat = async () => {
            const rawData = await fetchRealAvailability();
            const grouped = groupScheduleByDate(rawData);
            
            setGroupedSchedule(grouped);
            const sortedDates = Object.keys(grouped).sort();
            setAvailableDates(sortedDates);
            
            // 3. Start Chat at Date Selection (Step 2)
            if (sortedDates.length === 0) {
                setMessages([
                    { sender: 'bot', text: `👋 Welcome back! I apologize, but all counsellors are fully booked for the next month. Please try again later.` }
                ]);
                setStep(5);
            } else {
                const dateList = sortedDates.slice(0, 7).map((d, i) => `**${i + 1}. ${d}**`).join('\n');
                
                setMessages([
                    { sender: 'bot', text: `👋 Welcome back! We have availability on the following dates (next 7 shown):\n\n${dateList}\n\nPlease enter the **number** corresponding to the date you'd like to book. \nYou can type **EXIT** to leave anytime.` }
                ]);
                setStep(2); 
            }
        };
        loadScheduleAndStartChat();
    }, [currentStudentId, studentName, token]); 


    // --- Core Chatbot Logic ---
    const handleBotResponse = async (userMessage) => {
        let botResponse = '';
        let nextStep = step;

        switch (step) {
            // CASE 1 (Enrollment Input) has been removed

            case 2: // Date Selection
                const dateIndex = parseInt(userMessage.trim(), 10) - 1;
                const selectedDate = availableDates[dateIndex];
                
                if (selectedDate && groupedSchedule[selectedDate]) {
                    setBookingDetails(prev => ({ ...prev, sessionDate: selectedDate }));
                    
                    const slots = groupedSchedule[selectedDate].map((s, i) => 
                        `**${i + 1}.** ${s.name} (${s.title}) at ${s.time}`
                    ).join('\n');
                    
                    botResponse = `🗓️ Available slots on **${selectedDate}**:\n\n${slots}\n\nPlease enter the **number** of the slot you wish to book:`;
                    nextStep = 3;
                } else {
                    botResponse = "🤔 Invalid date selection. Please enter the number corresponding to a date from the list (e.g., **1**).";
                }
                break;

            case 3: // Slot Selection
                const slotIndex = parseInt(userMessage.trim(), 10) - 1;
                const slotsForDate = groupedSchedule[bookingDetails.sessionDate];
                const selectedSlot = slotsForDate ? slotsForDate[slotIndex] : null;

                if (selectedSlot) {
                    setBookingDetails(prev => ({
                        ...prev,
                        scheduleId: selectedSlot.schedule_id, 
                        counsellorName: selectedSlot.name,
                        sessionTime: selectedSlot.time, // FIX: Store the correct time key
                    }));
                    
                    // FIX: Use selectedSlot.time for display
                    botResponse = `You have selected **${selectedSlot.name}** on **${bookingDetails.sessionDate}** at **${selectedSlot.time}**. Please type **YES** to confirm this booking.`;
                    nextStep = 4;
                } else {
                    botResponse = "🤔 Invalid slot selection. Please enter the number corresponding to a slot from the list.";
                }
                break;

            case 4: // Confirmation
                if (userMessage.toUpperCase() === 'YES') {
                    botResponse = "⏳ Processing your request... Please wait while we secure your slot.";
                    
                    const result = await submitRealBooking(bookingDetails, token);
                    
                    if (result.success) {
                        botResponse = `🎉 **Booking Confirmed!** (Ref: ${result.booking_id})\n\n**Counsellor:** ${bookingDetails.counsellorName}\n**Date/Time:** ${bookingDetails.sessionDate} at ${bookingDetails.sessionTime}\n\nYou will be redirected to your Home Page now.`;
                        nextStep = 5; 
                        
                        // CRITICAL: Redirect to force the UpcomingAppointments component to refresh
                        setTimeout(() => { navigate('/HomePage'); }, 2500); 
                        
                    } else {
                        botResponse = `❌ Booking failed: **${result.message}**\n\nReturning to date selection.`;
                        
                        const rawData = await fetchRealAvailability();
                        const newGrouped = groupScheduleByDate(rawData);
                        const newSortedDates = Object.keys(newGrouped).sort();
                        
                        setGroupedSchedule(newGrouped);
                        setAvailableDates(newSortedDates);

                        const dateList = newSortedDates.slice(0, 7).map((d, i) => `**${i + 1}. ${d}**`).join('\n');
                        botResponse += `\n\nHere is the updated list. Please enter the **number** corresponding to the new date you'd like to book:`;
                        nextStep = 2; // Return to Date Selection
                    }
                } else {
                    botResponse = "Booking cancelled. Please re-enter the number of the slot you wish to book, or type **EXIT** to leave.";
                    nextStep = 3;
                }
                break;

            case 5: // Complete/End
                botResponse = "Thank you! Please type **EXIT** to leave.";
                break;
            
            default:
                botResponse = "I'm having trouble. Please type **EXIT** to leave.";
                nextStep = 5;
        }

        setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
        setStep(nextStep);
    };

    // Handle user input
    const handleUserInput = async (e) => {
        e.preventDefault();
        if (!input.trim() || step === 5 || step === 0) return;

        const userMessage = input.trim();
        setInput('');

        const updatedMessages = [...messages, { sender: 'user', text: userMessage }];
        setMessages(updatedMessages);

        if (userMessage.toUpperCase() === 'EXIT') {
            await new Promise(resolve => setTimeout(resolve, 500));
            setMessages(prev => [...prev, { sender: 'bot', text: "Thank you for using the Chatbot. Redirecting you to the home page now." }]);
            setTimeout(() => navigate('/HomePage'), 2000);
            return;
        }

        await handleBotResponse(userMessage);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-lg h-[80vh] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden">
                {/* Header */}
                <div className="bg-[#83acc1] text-white p-4 flex items-center justify-between shadow-lg">
                    <h2 className="text-xl font-bold">College Counselling Bot</h2>
                    <button 
                        onClick={() => navigate(-1)} 
                        className="text-sm px-3 py-1 bg-[#618191] rounded-full hover:bg-[#4f6875] transition"
                    >
                        &larr; Back
                    </button>
                </div>

                {/* Chat Messages Area */}
                <div className="flex-1 p-4 overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {messages.map((msg, index) => (
                        <ChatMessage 
                            key={index} 
                            sender={msg.sender} 
                            text={formatMessage(msg.text)} 
                        />
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <form onSubmit={handleUserInput} className="p-4 border-t border-gray-200">
                    <div className="flex">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={step === 5 ? "Session finished!" : "Type your selection here..."}
                            className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={step === 5 || step === 0}
                        />
                        <button
                            type="submit"
                            className="bg-[#618191] text-white p-3 rounded-r-lg hover:bg-[#4f6875] transition disabled:bg-gray-400"
                            disabled={step === 5 || step === 0}
                        >
                            Send
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookingChatbot;