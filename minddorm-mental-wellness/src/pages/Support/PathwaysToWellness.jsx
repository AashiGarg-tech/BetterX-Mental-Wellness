
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import WellnessCard from './WellnessCard';
import ResourceIcon from './ResourceIcon';

// Helper function to create Google Maps URL from address
const getMapsUrl = (address) => {
    const encodedAddress = encodeURIComponent(address);
    return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
};

// Dummy data for the cards (matching the image)
const wellnessCenters = [
  {
    title: 'Campus Wellness Center',
    address: '123 University Ave, Building A',
    phone: '9899568987',
    services: ['Counseling', 'Workshops', 'Support Groups'],
    imageUrl: '/images/img1.jpg', 
    directionsUrl: getMapsUrl('123 University Ave, Building A, Campus Wellness Center'),
  },
  {
    title: 'Student Health Services',
    address: '456 College Blvd, Health Center',
    phone: '8788599999',
    services: ['Referrals', 'Mental Health', 'Crisis Support'],
    imageUrl: '/images/img2.jpeg', 
    directionsUrl: getMapsUrl('456 College Blvd, Health Center, Student Health Services'),
  },
  {
    title: 'Community Mental Health Center',
    address: '123 University Ave, Building A',
    phone: '99545879998',
    services: ['Therapy', 'Support Groups', 'Medication Management'],
    imageUrl: '/images/img3.jpeg', 
    directionsUrl: getMapsUrl('123 University Ave, Building A, Community Mental Health Center'),
  },
];

// Dummy data for campus resources (matching the image)
const campusResources = [
    { icon: '🏠', title: 'Residence Hall Support', description: 'Resident life questions and issues. Contact your RA or Hall Directors.', contact: 'Contact Your RA or Hall Directors' },
    { icon: '🎓', title: 'Academic Success Center', description: 'Academic advising, counseling and study support.', contact: '(555) 234-5678' },
    { icon: '⚠️', title: 'Campus Safety', description: '24/7 safety issues and emergency response.', contact: '(555) 911-SAFE' },
    { icon: '♿', title: 'Disability Services', description: 'Student health accommodations and support services.', contact: '(555) 345-6789' },
]

const PathwaysToWellness = () => {
    const navigate = useNavigate();
    const location = useLocation();

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

    // Define the paths for the buttons
    const PATH_SUPPORT = '/SupportPage';
    const PATH_LIFELINE = '/lifeline';
    const PATH_WELLNESS = '/find-wellness';

    return (
        <div className="min-h-screen py-10 font-sans bg-gradient-to-b from-[#B5D8EB] to-[#F4F8FB]">
            {/* Main Title Section with Navigation */}
            <header className="text-center mb-12 max-w-4xl mx-auto px-4">
                <h1 className="text-5xl font-semibold text-[#000459] mb-2">
                    Pathways To Wellness
                </h1>
                <p className="text-gray-600 mb-6 italic">
                    Your feelings are valid, Let's talk it out and find support together
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
            
            {/* Wellness Centers Section */}
            <section className="max-w-7xl mx-auto px-4">
                <div className="flex flex-wrap justify-center lg:justify-between -m-3">
                    {wellnessCenters.map((center, index) => (
                        <WellnessCard key={index} {...center} />
                    ))}
                </div>
            </section>

            {/* Campus Resources Section */}
            <section className="mt-16 pt-10 border-t border-gray-300">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">
                    Campus Resources
                </h2>
                <div className="max-w-5xl mx-auto flex flex-wrap justify-center sm:justify-between px-4">
                    {campusResources.map((resource, index) => (
                        <ResourceIcon key={index} {...resource} />
                    ))}
                </div>
            </section>

            {/* Footer / Closing Message */}
            <footer className="text-center mt-16 text-gray-600 text-sm">
                <p>Don't worry Be happy</p>
            </footer>
        </div>
    );
};

export default PathwaysToWellness;