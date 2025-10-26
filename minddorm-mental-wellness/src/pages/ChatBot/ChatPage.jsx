// import React, { useState } from 'react';

// const ChatPage = () => {
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       text: "Hey, I'm here for you whenever you need. How are you feeling right now?",
//       isBot: true
//     }
//   ]);

//   const moreOptions = [
//     "Conduct a meditation session with me",
//     "The feeling involves, can you help me calm down?",
//     "I'm feeling lonely, can we talk?",
//     "I'm stressed about work, what can I do?"
//   ];

//   const handleSendMessage = () => {
//     if (message.trim()) {
//       setMessages([...messages, { id: messages.length + 1, text: message, isBot: false }]);
//       setMessage('');
      
//       // Simulate bot response
//       setTimeout(() => {
//         setMessages(prev => [...prev, {
//           id: prev.length + 1,
//           text: "I understand how you're feeling. Let's work through this together.",
//           isBot: true
//         }]);
//       }, 1000);
//     }
//   };

//   const handleOptionClick = (option) => {
//     setMessages([...messages, { id: messages.length + 1, text: option, isBot: false }]);
    
//     setTimeout(() => {
//       setMessages(prev => [...prev, {
//         id: prev.length + 1,
//         text: "That's a great choice. Let me help you with that.",
//         isBot: true
//       }]);
//     }, 1000);
//   };

//   return (
//     <div className="min-h-screen font-sans bg-gradient-to-b from-[#B5D8EB] to-[#F4F8FB]">
//       {/* Main Content */}
//       <div className="container mx-auto px-4 py-8">
//         {/* Mood Buttons */}
//         <div className="flex justify-center gap-3 mb-6">
//           <button className="bg-[#E8B4F5] text-[#000459] px-6 py-2 rounded-full font-semibold text-sm hover:bg-[#D8A4E5] transition">
//             Need Motivation
//           </button>
//           <button className="bg-[#FFB347] text-[#000459] px-6 py-2 rounded-full font-semibold text-sm hover:bg-[#EFA337] transition">
//             Not feeling good
//           </button>
//           <button className="bg-[#A8E6CF] text-[#000459] px-6 py-2 rounded-full font-semibold text-sm hover:bg-[#98D6BF] transition">
//             I need some tips
//           </button>
//         </div>

//         {/* Chat Container */}
//         <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg border border-[#D6E6F2] p-6 mb-6">
//           {/* Chat Messages */}
//           <div className="h-64 overflow-y-auto mb-4 space-y-4">
//             {messages.map((msg) => (
//               <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
//                 <div className={`max-w-md px-5 py-3 rounded-2xl ${
//                   msg.isBot 
//                     ? 'bg-[#C8E6F5] text-[#000459]' 
//                     : 'bg-[#2B3990] text-white'
//                 }`}>
//                   {msg.text}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Input Area */}
//           <div className="flex items-center gap-3 bg-[#F4F8FB] rounded-full px-4 py-3 border border-[#D6E6F2]">
//             <input
//               type="text"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//               placeholder="Type here..."
//               className="flex-1 bg-transparent outline-none text-[#000459] placeholder-slate-400"
//             />
//             <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-slate-100 transition">
//               <svg className="w-4 h-4 text-[#000459]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//             </button>
//             <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-slate-100 transition">
//               <svg className="w-4 h-4 text-[#000459]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
//               </svg>
//             </button>
//             <button 
//               onClick={handleSendMessage}
//               className="w-8 h-8 rounded-full bg-[#4A9FF5] flex items-center justify-center hover:bg-[#3A8FE5] transition"
//             >
//               <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* More Options Section */}
//         <div className="max-w-4xl mx-auto">
//           <h2 className="text-2xl font-bold text-[#000459] mb-4">More Options</h2>
//           <div className="bg-white rounded-3xl shadow-lg border border-[#D6E6F2] p-6">
//             <div className="space-y-3">
//               {moreOptions.map((option, index) => (
//                 <button
//                   key={index}
//                   onClick={() => handleOptionClick(option)}
//                   className="w-full bg-[#5EBDAC] hover:bg-[#4EAD9C] text-white text-left px-5 py-3 rounded-lg font-medium transition flex items-center gap-2"
//                 >
//                   <span className="text-xl">▶</span>
//                   <span>"{option}"</span>
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="text-center text-lg text-[#47708F] py-8 mt-12">
//         Don't worry Be happy
//       </footer>
//     </div>
//   );
// };

// export default ChatPage;

// import React, { useState, useRef, useEffect } from 'react';

// // --- LLM API Configuration ---
// // FINAL FIX: Reverting to the standard, official Gemini API URL structure.
// const MODEL_NAME = "gemini-2.5-flash-preview"; 
// // We MUST use the empty string. The environment should inject the key now.
// const API_KEY = ""; 
// const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;


// const ChatPage = () => {
//   const [message, setMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       text: "Hey, I'm here for you whenever you need. How are you feeling right now?",
//       isBot: true,
//       role: 'model'
//     }
//   ]);

//   const chatEndRef = useRef(null);

//   const moreOptions = [
//     "Conduct a meditation session with me",
//     "I'm feeling anxious, can you help me calm down?",
//     "I'm stressed about work, what can I do?"
//   ];
  
//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // --- CORE BACKEND LOGIC: Call to the Gemini API ---
//   const getBotResponse = async (userMessage) => {
//     setIsLoading(true);
    
//     // Convert current messages state into API chat history format
//     const chatHistory = messages
//       .map(msg => ({
//         role: msg.isBot ? 'model' : 'user',
//         parts: [{ text: msg.text }]
//       }));

//     // Add the new user message to the history for the current request
//     chatHistory.push({ role: 'user', parts: [{ text: userMessage }] });

//     const payload = {
//       contents: chatHistory,
//       systemInstruction: {
//         parts: [{ 
//           text: "You are BetterX, a friendly, compassionate, and brief conversational AI." 
//         }]
//       },
//     };

//     let response;
//     let retries = 0;
//     const maxRetries = 3;

//     while (retries < maxRetries) {
//       try {
//         // Use the new standard API URL
//         response = await fetch(API_URL, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(payload)
//         });
        
//         if (!response.ok) {
//           const errorBody = await response.text();
//           console.error(`API Call Failed (Status: ${response.status}):`, errorBody);
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const result = await response.json();
//         const botText = result?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I ran into an issue finding a response.";
        
//         setMessages(prev => [...prev, {
//           id: prev.length + 1,
//           text: botText,
//           isBot: true,
//           role: 'model'
//         }]);
        
//         break; // Exit loop on success

//       } catch (error) {
//         console.error(`Attempt ${retries + 1} failed:`, error);
//         retries++;
//         if (retries < maxRetries) {
//           const delay = Math.pow(2, retries) * 1000;
//           await new Promise(resolve => setTimeout(resolve, delay));
//         } else {
//           setMessages(prev => [...prev, {
//             id: prev.length + 1,
//             text: "I'm having trouble connecting right now. Please try again later.",
//             isBot: true,
//             role: 'model'
//           }]);
//         }
//       }
//     }

//     setIsLoading(false);
//   };
//   // --- END CORE BACKEND LOGIC ---

//   const handleSendMessage = () => {
//     if (message.trim() && !isLoading) {
//       const userMessage = message.trim();
//       setMessages([...messages, { id: messages.length + 1, text: userMessage, isBot: false, role: 'user' }]);
//       setMessage('');
//       getBotResponse(userMessage);
//     }
//   };

//   const handleOptionClick = (option) => {
//     if (!isLoading) {
//       setMessages([...messages, { id: messages.length + 1, text: option, isBot: false, role: 'user' }]);
//       getBotResponse(option);
//     }
//   };

//   return (
//     <div className="min-h-screen font-sans bg-gradient-to-b from-[#B5D8EB] to-[#F4F8FB]">
//       {/* Main Content */}
//       <div className="container mx-auto px-4 py-8">
//         {/* Mood Buttons */}
//         <div className="flex justify-center gap-3 mb-6">
//           <button className="bg-[#E8B4F5] text-[#000459] px-6 py-2 rounded-full font-semibold text-sm hover:bg-[#D8A4E5] transition">
//             Need Motivation
//           </button>
//           <button className="bg-[#FFB347] text-[#000459] px-6 py-2 rounded-full font-semibold text-sm hover:bg-[#EFA337] transition">
//             Not feeling good
//           </button>
//           <button className="bg-[#A8E6CF] text-[#000459] px-6 py-2 rounded-full font-semibold text-sm hover:bg-[#98D6BF] transition">
//             I need some tips
//           </button>
//         </div>

//         {/* Chat Container */}
//         <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg border border-[#D6E6F2] p-6 mb-6">
//           {/* Chat Messages */}
//           <div className="h-96 overflow-y-auto mb-4 space-y-4">
//             {messages.map((msg) => (
//               <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
//                 <div className={`max-w-md px-5 py-3 rounded-2xl ${
//                   msg.isBot 
//                     ? 'bg-[#C8E6F5] text-[#000459]' 
//                     : 'bg-[#2B3990] text-white'
//                 }`}>
//                   {msg.text}
//                 </div>
//               </div>
//             ))}
            
//             {/* Loading Indicator */}
//             {isLoading && (
//               <div className="flex justify-start">
//                 <div className="max-w-md px-5 py-3 rounded-2xl bg-[#C8E6F5] text-[#000459] italic animate-pulse">
//                   BetterX is typing...
//                 </div>
//               </div>
//             )}
            
//             {/* Scroll Anchor */}
//             <div ref={chatEndRef} />
//           </div>

//           {/* Input Area */}
//           <div className="flex items-center gap-3 bg-[#F4F8FB] rounded-full px-4 py-3 border border-[#D6E6F2]">
//             <input
//               type="text"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//               placeholder={isLoading ? "Please wait for the response..." : "Type here..."}
//               disabled={isLoading}
//               className="flex-1 bg-transparent outline-none text-[#000459] placeholder-slate-400 disabled:opacity-50"
//             />
            
//             {/* Send Button */}
//             <button 
//               onClick={handleSendMessage}
//               disabled={isLoading || !message.trim()}
//               className="w-8 h-8 rounded-full bg-[#4A9FF5] flex items-center justify-center hover:bg-[#3A8FE5] transition disabled:bg-gray-400"
//             >
//               <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* More Options Section */}
//         <div className="max-w-4xl mx-auto">
//           <h2 className="text-2xl font-bold text-[#000459] mb-4">More Options</h2>
//           <div className="bg-white rounded-3xl shadow-lg border border-[#D6E6F2] p-6">
//             <div className="space-y-3">
//               {moreOptions.map((option, index) => (
//                 <button
//                   key={index}
//                   onClick={() => handleOptionClick(option)}
//                   disabled={isLoading}
//                   className="w-full bg-[#5EBDAC] hover:bg-[#4EAD9C] disabled:bg-gray-400 text-white text-left px-5 py-3 rounded-lg font-medium transition flex items-center gap-2"
//                 >
//                   <span className="text-xl">▶</span>
//                   <span>"{option}"</span>
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="text-center text-lg text-[#47708F] py-8 mt-12">
//         Don't worry Be happy
//       </footer>
//     </div>
//   );
// };

// export default ChatPage;


import React, { useState, useRef, useEffect } from 'react';
import Header from '../../components/Header';

const ChatPage = ({ onSignOut }) => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [connectionError, setConnectionError] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey, I'm here for you whenever you need. How are you feeling right now?",
      isBot: true,
      role: 'model'
    }
  ]);

  const chatEndRef = useRef(null);

  const moreOptions = [
    "Conduct a meditation session with me",
    "I'm feeling anxious, can you help me calm down?",
    "I'm stressed about work, what can I do?"
  ];

  // Initialize session ID on component mount
  useEffect(() => {
    let storedSessionId = localStorage.getItem('chatSessionId');
    if (!storedSessionId) {
      storedSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('chatSessionId', storedSessionId);
    }
    setSessionId(storedSessionId);
    console.log('✅ Session ID initialized:', storedSessionId);
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Main function to get bot response from backend
  const getBotResponse = async (userMessage) => {
    setIsLoading(true);
    setConnectionError(false);

    try {
      console.log('📤 Sending to backend:', { message: userMessage, sessionId });
      console.log('🔗 Backend URL: http://localhost:5050/api/chat');
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

      const response = await fetch("http://localhost:5050/api/gemini-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, sessionId }),
      });

      clearTimeout(timeoutId);

      console.log('📊 Response status:', response.status);
      console.log('📊 Response ok:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Server error response:', errorText);
        throw new Error(`Server returned ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log('📥 Response data:', data);
      
      const botText = data.reply || "Sorry, I couldn't get a response.";

      // Check if it's an error message from backend
      if (botText.includes("configuration error") || botText.includes("API key error")) {
        setConnectionError(true);
      }

      // Add bot message to chat
      setMessages(prev => [
        ...prev,
        { id: prev.length + 1, text: botText, isBot: true, role: "model" },
      ]);

    } catch (error) {
      console.error("❌ Backend error:", error);
      console.error("❌ Error name:", error.name);
      console.error("❌ Error message:", error.message);
      
      setConnectionError(true);
      
      let errorMessage = "Oops! I'm having trouble connecting. ";
      
      if (error.name === 'AbortError') {
        errorMessage += "The request took too long. Please try again.";
      } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        errorMessage += "Cannot reach the server. Make sure the backend is running on port 5000.";
      } else if (error.message.includes('500')) {
        errorMessage += "Server error. Check the backend console for details.";
      } else {
        errorMessage += "Please try again.";
      }
      
      setMessages(prev => [
        ...prev,
        {
          id: prev.length + 1,
          text: errorMessage,
          isBot: true,
          role: "model",
        },
      ]);
    }

    setIsLoading(false);
  };

  // Handle sending message from input
  const handleSendMessage = () => {
    if (message.trim() && !isLoading && sessionId) {
      const userMessage = message.trim();
      
      // Add user message to chat
      setMessages(prev => [
        ...prev,
        { id: prev.length + 1, text: userMessage, isBot: false, role: 'user' },
      ]);
      
      setMessage('');
      getBotResponse(userMessage);
    }
  };

  // Handle clicking on pre-defined options
  const handleOptionClick = (option) => {
    if (!isLoading && sessionId) {
      setMessages(prev => [
        ...prev,
        { id: prev.length + 1, text: option, isBot: false, role: 'user' },
      ]);
      getBotResponse(option);
    }
  };

  // Reset conversation
  const resetChat = async () => {
    if (window.confirm('Start a new conversation? This will clear your chat history.')) {
      try {
        await fetch("http://localhost:5050/api/gemini-chat/reset", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });
        
        setMessages([
          {
            id: 1,
            text: "Hey, I'm here for you whenever you need. How are you feeling right now?",
            isBot: true,
            role: 'model'
          }
        ]);
        
        setConnectionError(false);
        console.log('🔄 Chat reset successfully');
      } catch (error) {
        console.error('❌ Reset error:', error);
        alert('Failed to reset chat. Please try again.');
      }
    }
  };

  // Test backend connection
  const testConnection = async () => {
    try {
      console.log('🧪 Testing backend connection...');
      const response = await fetch("http://localhost:5050/api/gemini-chat/health");
      const data = await response.json();
      console.log('✅ Backend health check:', data);
      alert(`Backend Status: ${data.status}\nAPI Key: ${data.hasApiKey ? 'Present' : 'Missing'}\nModel: ${data.model}`);
    } catch (error) {
      console.error('❌ Backend not reachable:', error);
      alert('❌ Cannot connect to backend!\nMake sure server is running on port 5050.');
    }
  };

  return (
    <div className="min-h-screen font-sans bg-gradient-to-b from-[#B5D8EB] to-[#F4F8FB]">
      {/* Header Component */}
      <Header onSignOut={onSignOut} />

      {/* Connection Error Banner */}
      {connectionError && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mx-4 mt-4 rounded">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="font-bold">Connection Issue</p>
                <p className="text-sm">Cannot connect to backend server. Check console for details.</p>
              </div>
            </div>
            <button 
              onClick={testConnection}
              className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
            >
              Test
            </button>
          </div>
        </div>
      )}

      {/* Top Right Buttons */}
      <div className="flex justify-end gap-3 px-8 pt-6 pb-4">
        <button 
          onClick={resetChat}
          disabled={isLoading}
          className="bg-[#7B9FE8] text-white px-5 py-2 rounded-lg font-semibold text-sm hover:bg-[#6B8FD8] transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          New Chat
        </button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-4">
        {/* Mood Buttons */}
        <div className="flex justify-center gap-3 mb-6 flex-wrap">
          <button 
            onClick={() => handleOptionClick("I need some motivation and encouragement right now")}
            disabled={isLoading || !sessionId}
            className="bg-[#E8B4F5] text-[#000459] px-6 py-2 rounded-full font-semibold text-sm hover:bg-[#D8A4E5] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Need Motivation
          </button>
          <button 
            onClick={() => handleOptionClick("I'm not feeling good today, can you help me?")}
            disabled={isLoading || !sessionId}
            className="bg-[#FFB347] text-[#000459] px-6 py-2 rounded-full font-semibold text-sm hover:bg-[#EFA337] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Not feeling good
          </button>
          <button 
            onClick={() => handleOptionClick("I'd like some tips for improving my mental wellbeing")}
            disabled={isLoading || !sessionId}
            className="bg-[#A8E6CF] text-[#000459] px-6 py-2 rounded-full font-semibold text-sm hover:bg-[#98D6BF] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            I need some tips
          </button>
        </div>

        {/* Chat Container */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg border border-[#D6E6F2] p-6 mb-6">
          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto mb-4 space-y-4">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-md px-5 py-3 rounded-2xl ${msg.isBot ? 'bg-[#C8E6F5] text-[#000459]' : 'bg-[#2B3990] text-white'}`}>
                  {msg.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-md px-5 py-3 rounded-2xl bg-[#C8E6F5] text-[#000459] italic">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-[#000459] rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-[#000459] rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></span>
                      <span className="w-2 h-2 bg-[#000459] rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                    </div>
                    <span>BetterX is typing...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="flex items-center gap-3 bg-[#F4F8FB] rounded-full px-4 py-3 border border-[#D6E6F2]">
            <input
              type="text"
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
              placeholder={isLoading ? "Please wait..." : sessionId ? "Type here..." : "Loading..."}
              disabled={isLoading || !sessionId}
              className="flex-1 bg-transparent outline-none text-[#000459] placeholder-slate-400 disabled:opacity-50"
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !message.trim() || !sessionId}
              className="w-8 h-8 rounded-full bg-[#4A9FF5] flex items-center justify-center hover:bg-[#3A8FE5] transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>

        {/* More Options Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-[#000459] mb-4">More Options</h2>
          <div className="bg-white rounded-3xl shadow-lg border border-[#D6E6F2] p-6">
            <div className="space-y-3">
              {moreOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  disabled={isLoading || !sessionId}
                  className="w-full bg-[#5EBDAC] hover:bg-[#4EAD9C] disabled:bg-gray-400 disabled:cursor-not-allowed text-white text-left px-5 py-3 rounded-lg font-medium transition flex items-center gap-2"
                >
                  <span className="text-xl">▶</span>
                  <span>{option}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-lg text-[#47708F] py-8 mt-12">
        Don't worry Be happy
      </footer>
    </div>
  );
};

export default ChatPage;