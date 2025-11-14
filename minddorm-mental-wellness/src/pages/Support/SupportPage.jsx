
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:5050/api'; 

// --- API INTERACTION FUNCTION ---

/**
 * Fetches all unbooked slots and processes them to find the single next available slot 
 * for each counsellor, merging it with static card data.
 */
const fetchCounsellorAvailability = async () => {
    // Static data is merged with dynamic schedule data
    const staticData = [
        { name: "Prof Manoj Soni", title: "Dean Student Welfare", experience: "8 Years of experience", tags: [{rating: 4.9}, {name: "CBT"}, {name: "Mindfulness"}, {name: "Student Issues"}], avatar: '/images/men.png' },
        { name: "Dr. Monali Wanker", title: "Chief Hostel Warden", experience: "10 Years of experience", tags: [{rating: 4.9}, {name: "CBT"}, {name: "Mindfulness"}, {name: "Student Issues"}], avatar: '/images/img19.jpg' },
        { name: "Ms Sarika Reddy", title: "Assistant Warden", experience: "9 Years of experience", tags: [{rating: 4.7}, {name: "Stress"}, {name: "Academic Pressure"}, {name: "Life Coaching"}], avatar: '/images/img19.jpg' },
        { name: "Ms Bishnu Priya", title: "Assistant Warden", experience: "8 Years of experience", tags: [{rating: 4.9}, {name: "EMDR"}, {name: "Support-Groups"}, {name: "Trauma-Informed"}], avatar: '/images/img19.jpg' },
    ];
    
    try {
        const response = await fetch(`${API_BASE_URL}/counsellors/availability`);
        if (!response.ok) throw new Error('Failed to fetch schedule.');
        const rawData = await response.json();
        
        const nextAvailableMap = {};
        
        // Find the single next available slot for each counsellor
        rawData.forEach(slot => {
            const name = slot.name;
            // Since data is ordered by date/time, the first entry for a name is the next slot.
            if (!nextAvailableMap[name]) {
                nextAvailableMap[name] = {
                    title: slot.title,
                    next_slot_date: slot.schedule_date,
                    next_slot_time: slot.schedule_time.substring(0, 5), // HH:MM
                };
            }
        });

        // Merge dynamic schedule data with static card data
        return staticData.map(c => ({
            ...c,
            dynamic_schedule: nextAvailableMap[c.name]
        }));
        
    } catch (error) {
        console.error("Critical error during data fetch:", error);
        return staticData.map(c => ({...c, dynamic_schedule: null}));
    }
};

// Reusable component for the Expert Cards
const ExpertCard = ({ name, title, experience, tags, avatar, dynamic_schedule }) => {
    
    let nextAvailableText;

    if (dynamic_schedule) {
        // Format date and time
        const datePart = new Date(dynamic_schedule.next_slot_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const timePart = dynamic_schedule.next_slot_time === '10:00' ? '10:00 AM' : '3:00 PM';
        nextAvailableText = `${datePart} at ${timePart}`;
    } else {
        nextAvailableText = "Fully Booked for next 30 days 😔";
    }

    return (
        <div className="flex bg-white rounded-xl shadow-md p-4 m-2 w-full max-w-lg transition duration-300 hover:shadow-lg"> 
            {/* Avatar */}
            <img src={avatar} alt={name} className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-gray-100" />
            
            <div className="flex-1">
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-blue-900">{name}</h3>
                    
                    {/* Rating Display with Yellow Star Icon */}
                    <div className="flex items-center text-sm text-green-600 font-bold bg-green-100 px-2 py-0.5 rounded-full">
                        <svg className="w-3 h-3 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.6-1.5 1.9.921l2.5 7.66h8.049c.874 0 1.23.585.877 1.459l-6.52 4.75 2.5 7.66c.3.921-.42 1.25-1.077.747L10 20.07l-6.52 4.75c-.657.503-1.377.174-1.077-.747l2.5-7.66L.12 11.046c-.874-.874-.47-1.459.38-.874H9.049z"/>
                        </svg>
                        {tags[0].rating}
                    </div>
                </div>
                
                <p className="text-sm text-gray-700 font-medium">{dynamic_schedule ? dynamic_schedule.title : title}</p>
                <p className="text-xs text-gray-500 my-1">{experience}</p>
                
                {/* --- DISPLAY LIVE AVAILABILITY --- */}
                <div className="text-xs font-semibold mb-2">
                    <p className="text-gray-600">
                        <span className={`font-semibold ${dynamic_schedule ? 'text-green-600' : 'text-red-500'}`}>
                            Next available: {nextAvailableText}
                        </span>
                    </p>
                </div>

                <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => index > 0 && (
                        <span key={index} className="px-3 py-1 text-xs font-medium text-blue-900 bg-blue-100 rounded-full border border-blue-200">
                            {tag.name}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};


// Main Support Page Component
const SupportPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // State to hold the dynamic counsellor data
    const [counsellorData, setCounsellorData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch data from the live API on component mount
    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            const data = await fetchCounsellorAvailability();
            setCounsellorData(data);
            setIsLoading(false);
        };
        loadData();
    }, []);

    // Helper function to dynamically apply classes based on the active path
    const getButtonClass = (targetPath) => {
        const isActive = location.pathname.toLowerCase() === targetPath.toLowerCase();
        return isActive 
            ? "px-4 py-2 text-sm font-semibold rounded-full bg-blue-500 text-white transition shadow-lg"
            : "px-4 py-2 text-sm font-semibold text-gray-700 hover:text-blue-500 transition";
    };

    // Helper function for icon/image styling (applies color inversion when active)
    const getIconClass = (targetPath) => {
        const isActive = location.pathname.toLowerCase() === targetPath.toLowerCase();
        return isActive ? 'filter brightness-0 invert' : ''; 
    };

    // Define the paths for the buttons and the new booking page
    const PATH_SUPPORT = '/SupportPage';
    const PATH_LIFELINE = '/lifeline';
    const PATH_WELLNESS = '/find-wellness';
    const PATH_BOOKING_CHATBOT = '/book-counselling'; 

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#B5D8EB] to-[#F4F8FB] font-sans">
            <div className="max-w-7xl mx-auto py-10 px-4">
            
            {/* Header / Cylinder Navigation */}
            <header className="text-center mb-12 max-w-4xl mx-auto">
                <h1 className="text-5xl font-semibold text-[#000459] mb-2">
                    Your Path To Inner Calm Starts Here
                </h1>
                <p className="text-gray-600 mb-6">
                    Connect with compassionate experts and unlock personal support to mental wellness
                </p>
                
                {/* CYLINDER NAVIGATION BLOCK */}
                <div className="flex justify-center items-center p-2 rounded-full bg-white shadow-xl max-w-md mx-auto border-2 border-gray-100">
                    
                    {/* EXPLORE GUIDES (Support) BUTTON */}
                    <button 
                        onClick={() => navigate(PATH_SUPPORT)}
                        className={`${getButtonClass(PATH_SUPPORT)} flex items-center`}
                    >
                        <img 
                            src="/images/img23.png" 
                            alt="Guides Icon" 
                            className={`w-4 h-4 mr-1 object-contain ${getIconClass(PATH_SUPPORT)}`} 
                        />
                        Explore Guides
                    </button>
                    
                    {/* LIFELINE (CallAway.jsx) BUTTON */}
                    <button 
                        onClick={() => navigate(PATH_LIFELINE)}
                        className={`${getButtonClass(PATH_LIFELINE)} mx-4 flex items-center`}
                    >
                        <img 
                            src="/images/img21.jpg" 
                            alt="Lifeline Icon" 
                            className={`w-4 h-4 mr-1 object-contain ${getIconClass(PATH_LIFELINE)}`} 
                        />
                        Lifeline
                    </button>
                    
                    {/* FIND WELLNESS (PathwaysToWellness.jsx) BUTTON */}
                    <button 
                        onClick={() => navigate(PATH_WELLNESS)}
                        className={`${getButtonClass(PATH_WELLNESS)} flex items-center`}
                    >
                        <img 
                            src="/images/img22.jpg" 
                            alt="Find Wellness Icon" 
                            className={`w-4 h-4 mr-1 object-contain ${getIconClass(PATH_WELLNESS)}`}
                        />
                        Find Wellness
                    </button>
                </div>
            </header>
            
            {/* How to Get Started Section */}
            <section className="text-center mb-16 relative bg-white p-8 rounded-xl shadow-lg border border-gray-100 max-w-6xl mx-auto">
                <h2 className="text-2xl font-semibold text-gray-800 mb-8">How to get started</h2>
                
                {/* Stacked Images on Left */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden md:block">
                    <img src="/images/img13.jpg" alt="avatar 1" className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md mb-2" />
                    <img src="/images/img14.jpg" alt="avatar 2" className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md mb-2 relative left-3" />
                    <img src="/images/img15.jpeg" alt="avatar 3" className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md relative left-1" />
                </div>

                {/* Stacked Images on Right */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:block">
                    <img src="/images/img13.jpg" alt="avatar 4" className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md mb-2" />
                    <img src="/images/img14.jpg" alt="avatar 5" className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md mb-2 relative -left-3" />
                    <img src="/images/img15.jpeg" alt="avatar 6" className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md relative -left-1" />
                </div>

                {/* STEPS IN ONE LINE */}
                <div className="flex flex-wrap md:flex-nowrap justify-between items-start space-y-8 md:space-y-0 md:space-x-8 px-8">
                    {/* Step 1 */}
                    <div className="flex-1 w-full p-4">
                        <div className="flex justify-center items-center mb-4">
                            <img src="/images/img10.jpg" alt="Book Appointment" className="w-20 h-20 object-contain" />
                        </div>
                        <p className="font-semibold text-gray-800">1. Book your appointment</p>
                        <p className="text-sm text-gray-600 mt-1">Choose a date and time that works best for you using our easy online scheduler.</p>
                    </div>
                    {/* Step 2 */}
                    <div className="flex-1 w-full p-4">
                        <div className="flex justify-center items-center mb-4">
                            <img src="/images/img11.jpg" alt="Connect with Counselor" className="w-20 h-20 object-contain" />
                        </div>
                        <p className="font-semibold text-gray-800">2. Connect with your counselor</p>
                        <p className="text-sm text-gray-600 mt-1">Meet your counselor in a safe, confidential space—either in person or virtually.</p>
                    </div>
                    {/* Step 3 */}
                    <div className="flex-1 w-full p-4">
                        <div className="flex justify-center items-center mb-4">
                            <img src="/images/img12.jpg" alt="Begin Healing Journey" className="w-20 h-20 object-contain" />
                        </div>
                        <p className="font-semibold text-gray-800">3. Begin your Healing Journey</p>
                        <p className="text-sm text-gray-600 mt-1">Get personalized guidance, resources, and follow-up sessions to support your well-being.</p>
                    </div>
                </div>
            </section>

            {/* Meet Your Guiding Lights Section (Buttons) */}
            <section className="mb-16">
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-8 flex items-center justify-center">
                    Meet Your Guiding Lights
                </h2>
                <div className="flex justify-center space-x-4 mb-8">
                    
                    {/* Connect with Counselor link */}
                    <button 
                        onClick={() => navigate(PATH_BOOKING_CHATBOT)} 
                        className="px-6 py-3 text-white font-semibold rounded-full bg-[#83acc1] hover:bg-[#c29fe0] transition shadow-md no-underline flex items-center justify-center"
                    >
                        Connect with Your College Counselor
                    </button>
                    
                </div>

                <div className="max-w-4xl mx-auto">
                    <h3 className="text-xl font-semibold text-blue-900 border-b-2 border-purple-400 pb-2 mb-6">
                        Live Counsellor Availability
                        {isLoading && <span className="ml-4 text-sm font-normal text-gray-500">(Loading...)</span>}
                    </h3>
                    
                    <div className="flex flex-wrap -m-2">
                        {/* Display Counsellor Cards with Live Data */}
                        {counsellorData.length > 0 ? (
                            counsellorData.map((expert, index) => (
                                <div key={index} className="w-full lg:w-1/2 p-2">
                                    <ExpertCard key={index} {...expert} />
                                </div>
                            ))
                        ) : (
                            !isLoading && <p className="text-center w-full py-8 text-gray-500">No counsellor data available or connection error.</p>
                        )}
                    </div>
                </div>
            </section>

            <footer className="text-center mt-10 text-gray-600 text-sm">
                <p>Don't worry Be happy</p>
            </footer>
            </div>
        </div>
    );
};

export default SupportPage;