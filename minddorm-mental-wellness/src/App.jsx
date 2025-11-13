


// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";
// import Header from "./components/Header";
// import AuthPage from "./pages/LoginPage/AuthPage";

// import HomePage from "./pages/Home/HomePage";
// import SupportPage from "./pages/Support/SupportPage";  
// import WellnessCard from "./pages/Support/WellnessCard";
// import ResourceIcon from "./pages/Support/ResourceIcon";  
// import CallAway from "./pages/Support/CallAway";
// import PathwaysToWellness from "./pages/Support/PathwaysToWellness";

// import SupportOptions from "./pages/Resources/support_condition";
// import ArticlesPage from "./pages/Resources/articles_page";
// import AudioPage from "./pages/Resources/audio_page";
// import VideoPage from "./pages/Resources/video_page";

// import WellnessDashboard from "./pages/UserDashboard/WellnessDashboard";
// import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";

// import AnnouncementsPage from "./pages/Community/AnnouncementsPage";
// import ListenLearnPage from "./pages/Community/ListenLearnPage";
// import ReachOutPage from "./pages/Community/ReachOutPage";
// import CommunityHeader from "./pages/Community/CommunityHeader";

// import ChatPage from "./pages/ChatBot/ChatPage";
// import UserProfile from "./components/UserProfile";

// import TrackMoodPage from "./pages/TrackMood/TrackMoodPage";
// import PSSAssessment from "./pages/TrackMood/PSS";
// import PHQ9Assessment from "./pages/TrackMood/PHQ-9";
// import GAD7Assessment from "./pages/TrackMood/GAD-7";

// // Protected Route Wrapper
// const ProtectedRoute = ({ isLoggedIn, children }) => {
//   return isLoggedIn ? children : <Navigate to="/" replace />;
// };

// const ProtectedLayout = ({ onSignOut }) => (
//   <>
//     <Header onSignOut={onSignOut} />
//     <main className="p-4">
//       <Outlet />
//     </main>
//   </>
// );

// const AppContent = () => {
//   // ✅ Authentication state
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [authToken, setAuthToken] = useState(null);
//   const [currentUser, setCurrentUser] = useState(null);

//   // ✅ Handle successful authentication
//   const handleAuthSuccess = (token, user) => {
//     setIsLoggedIn(true);
//     setAuthToken(token);
//     setCurrentUser(user);
//   };

//   // ✅ Handle sign out
//   const handleSignOut = () => {
//     setIsLoggedIn(false);
//     setAuthToken(null);
//     setCurrentUser(null);
//   };

//   return (
//     <div className="min-h-screen font-sans bg-gradient-to-b from-[#B5D8EB] to-[#F4F8FB]">
//       <Routes>
//         {/* Public Route - Login/Signup */}
//         <Route 
//           path="/" 
//           element={
//             isLoggedIn ? (
//               <Navigate to="/HomePage" replace />
//             ) : (
//               <AuthPage onAuthSuccess={handleAuthSuccess} />
//             )
//           } 
//         />

//         {/* Protected Routes */}
//         <Route 
//           element={
//             <ProtectedRoute isLoggedIn={isLoggedIn}>
//               <ProtectedLayout onSignOut={handleSignOut} />
//             </ProtectedRoute>
//           }
//         >
//           <Route path="/HomePage" element={<HomePage />} />
//           <Route path="/SupportPage" element={<SupportPage />} />
//           <Route path="/ChatPage" element={<ChatPage />} />
//           <Route path="/AnnouncementsPage" element={<AnnouncementsPage />} />
//           <Route path="/ListenLearnPage" element={<ListenLearnPage />} />
//           <Route path="/ReachOutPage" element={<ReachOutPage />} />
//           <Route path="/SupportOptions" element={<SupportOptions />} />
//           <Route path="/WellnessCard" element={<WellnessCard />} />
//           <Route path="/ResourceIcon" element={<ResourceIcon />} />
//           <Route path="/ArticlesPage" element={<ArticlesPage />} />
//           <Route path="/AudioPage" element={<AudioPage />} />
//           <Route path="/VideoPage" element={<VideoPage />} />
//           <Route path="/TrackMoodPage" element={<TrackMoodPage />} />
//           <Route path="/PSSAssessment" element={<PSSAssessment />} />
//           <Route path="/PHQ9Assessment" element={<PHQ9Assessment />} />
//           <Route path="/GAD7Assessment" element={<GAD7Assessment />} />
//           <Route path="/WellnessDashboard" element={<WellnessDashboard />} />
//           <Route 
//             path="/UserProfile" 
//             element={
//               <UserProfile 
//                 userEmail={currentUser?.email || "user@betterx.com"} 
//                 userName={currentUser?.name || "User"} 
//               />
//             } 
//           />
//           <Route path="/AdminDashboard" element={<AdminDashboard />} />
//           <Route path="/lifeline" element={<CallAway />} />
//           <Route path="/find-wellness" element={<PathwaysToWellness />} />
//           <Route path="/CommunityHeader" element={<CommunityHeader />} />
//         </Route>

//         {/* 404 Page */}
//         <Route path="*" element={<div className="text-center py-20 text-gray-600 text-xl">🚧 Page Not Found</div>} />
//       </Routes>
//     </div>
//   );
// };

// function App() {
//   return (
//     <Router>
//       <AppContent />
//     </Router>
//   );
// }

// export default App;

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Header from "./components/Header.jsx";
import AuthPage from "./pages/LoginPage/AuthPage.jsx";

import HomePage from "./pages/Home/HomePage.jsx";
import SupportPage from "./pages/Support/SupportPage.jsx";  
import WellnessCard from "./pages/Support/WellnessCard.jsx";
import ResourceIcon from "./pages/Support/ResourceIcon.jsx";  
import CallAway from "./pages/Support/CallAway.jsx";
import PathwaysToWellness from "./pages/Support/PathwaysToWellness.jsx";
import BookingChatbot from "./pages/Support/BookingChatbot.jsx";

import SupportOptions from "./pages/Resources/support_condition.jsx";
import ArticlesPage from "./pages/Resources/articles_page.jsx";
import AudioPage from "./pages/Resources/audio_page.jsx";
import VideoPage from "./pages/Resources/video_page.jsx";

import WellnessDashboard from "./pages/UserDashboard/WellnessDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard.jsx";

import AnnouncementsPage from "./pages/Community/AnnouncementsPage.jsx";
import ListenLearnPage from "./pages/Community/ListenLearnPage.jsx";
import ReachOutPage from "./pages/Community/ReachOutPage.jsx";
import CommunityHeader from "./pages/Community/CommunityHeader.jsx";

import ChatPage from "./pages/ChatBot/ChatPage.jsx";
import UserProfile from "./components/UserProfile.jsx";

import TrackMoodPage from "./pages/TrackMood/TrackMoodPage.jsx";
import PSSAssessment from "./pages/TrackMood/PSS.jsx";
import PHQ9Assessment from "./pages/TrackMood/PHQ-9.jsx";
import GAD7Assessment from "./pages/TrackMood/GAD-7.jsx";

// Protected Route Wrapper
const ProtectedRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="/" replace />;
};

const ProtectedLayout = ({ onSignOut }) => (
  <>
    <Header onSignOut={onSignOut} />
    <main className="p-4">
      <Outlet />
    </main>
  </>
);

const AppContent = () => {
  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // Handle successful authentication
  const handleAuthSuccess = (token, user) => {
    setIsLoggedIn(true);
    setAuthToken(token);
    setCurrentUser(user);
    // You might want to store the token in localStorage here as well, 
    // as your CounselorScheduleView component relies on it.
    localStorage.setItem('token', token);
  };

  // Handle sign out
  const handleSignOut = () => {
    setIsLoggedIn(false);
    setAuthToken(null);
    setCurrentUser(null);
    localStorage.removeItem('token'); // Clear token on sign out
  };

  return (
    <div className="min-h-screen font-sans bg-gradient-to-b from-[#B5D8EB] to-[#F4F8FB]">
      <Routes>
        {/* Public Route - Login/Signup */}
        <Route 
          path="/" 
          element={
            isLoggedIn ? (
              <Navigate to="/HomePage" replace />
            ) : (
              <AuthPage onAuthSuccess={handleAuthSuccess} />
            )
          } 
        />

        {/* === TEMPORARY: Public access to ChatPage for testing ===
            Placed outside protected routes so you can open /ChatPage
            directly without logging in. Remove or move this back inside
            ProtectedRoute when you re-enable auth protection. */}
        <Route path="/ChatPage" element={<ChatPage />} />

        {/* Protected Routes (require login) */}
        <Route 
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <ProtectedLayout onSignOut={handleSignOut} />
            </ProtectedRoute>
          }
        >
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/SupportPage" element={<SupportPage />} />
          <Route path="/AnnouncementsPage" element={<AnnouncementsPage />} />
          <Route path="/ListenLearnPage" element={<ListenLearnPage />} />
          <Route path="/ReachOutPage" element={<ReachOutPage />} />
          <Route path="/SupportOptions" element={<SupportOptions />} />
          <Route path="/book-counselling" element={<BookingChatbot />} />
          <Route path="/WellnessCard" element={<WellnessCard />} />
          <Route path="/ResourceIcon" element={<ResourceIcon />} />
          <Route path="/ArticlesPage" element={<ArticlesPage />} />
          <Route path="/AudioPage" element={<AudioPage />} />
          <Route path="/VideoPage" element={<VideoPage />} />
          <Route path="/TrackMoodPage" element={<TrackMoodPage />} />
          <Route path="/PSSAssessment" element={<PSSAssessment />} />
          <Route path="/PHQ9Assessment" element={<PHQ9Assessment />} />
          <Route path="/GAD7Assessment" element={<GAD7Assessment />} />
          <Route path="/WellnessDashboard" element={<WellnessDashboard />} />
          <Route 
            path="/UserProfile" 
            element={
              <UserProfile 
                user={currentUser}
                token={authToken}
                onUpdateProfile={(updatedUser) => setCurrentUser(updatedUser)}
              />
            } 
          />
          {/* FIX APPLIED HERE: Pass currentUser as a prop to AdminDashboard */}
          <Route 
            path="/AdminDashboard" 
            element={<AdminDashboard currentUser={currentUser} />} 
          />
          <Route path="/lifeline" element={<CallAway />} />
          <Route path="/find-wellness" element={<PathwaysToWellness />} />
          <Route path="/CommunityHeader" element={<CommunityHeader />} />
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<div className="text-center py-20 text-gray-600 text-xl">🚧 Page Not Found</div>} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;