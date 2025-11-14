import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CommunityHeader = ({ activeTab }) => {
  const [postText, setPostText] = useState('');

  const handlePost = () => {
    if (postText.trim()) {
      console.log('Posting:', postText);
      setPostText('');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start justify-between mb-8">
        <div>
          <h1 className="text-5xl font-semibold text-[#000459] mb-2">BetterX</h1>
          <h2 className="text-2xl lg:text-3xl font-semibold text-[#000459]">Community</h2>
        </div>
        <div className="text-right mt-4 sm:mt-0">
          <div className="relative">
              <img src="/logo.png" alt="AI Assistant" className="w-40 md:w-40 relative z-10" />
        </div>
        </div>
      </div>

      {/* Post Input Section */}
      <div className="bg-white rounded-2xl p-5 lg:p-6 mb-8 shadow-sm border border-slate-200">
        <input
          type="text"
          placeholder="What's on your mind..."
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handlePost()}
          className="w-full px-4 py-2.5 border border-slate-300 rounded-full mb-3 text-sm focus:outline-none focus:border-[#E8A287]"
        />
        <button
          type="button"
          onClick={handlePost}
          className="bg-[#E8A287] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-[#D89277] transition"
        >
          POST
        </button>

        <div className="mt-4 pt-4 border-t border-slate-200">
          <button
            type="button"
            className="bg-[#E8A287] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-[#D89277] transition flex items-center gap-2"
          >
            Share your story
            <span className="text-lg">+</span>
          </button>
          <p className="text-xs text-[#2B5A7A] mt-2">
            Share your story, listen to others, or just breathe.<br />
            No pressure.
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <Link
          to="/AnnouncementsPage"
          className={`p-5 rounded-2xl transition ${
            activeTab === 'AnnouncementsPage'
              ? 'bg-[#FFF9E6] border-2 border-[#E8D4A0]'
              : 'bg-gradient-to-b from-[#D8F6F7] to-white border border-slate-200 hover:shadow-md'
          }`}
        >
          <h3 className="text-base lg:text-lg font-bold text-[#2B5A7A] mb-1.5">Announcements</h3>
          <p className="text-xs lg:text-sm text-slate-600">
            Important announcements, news, and dates related to mental health.
          </p>
        </Link>

        <Link
          to="/ListenLearnPage"
          className={`p-5 rounded-2xl transition ${
            activeTab === 'ListenLearnPage'
              ? 'bg-[#E8F0FF] border-2 border-[#B8D4F1]'
              : 'bg-gradient-to-b from-[#DEDEFF] to-white border border-slate-200 hover:shadow-md'
          }`}
        >
          <h3 className="text-base lg:text-lg font-bold text-[#2B5A7A] mb-1.5">Listen & Learn</h3>
          <p className="text-xs lg:text-sm text-slate-600">
            Stories, insights, and gentle advice to feel understood.
          </p>
        </Link>

        <Link
          to="/ReachOutPage"
          className={`p-5 rounded-2xl transition ${
            activeTab === 'ReachOutPage'
              ? 'bg-[#E8F5FF] border-2 border-[#B8D9F1]'
              : 'bg-gradient-to-b from-[#FFFACD] to-white border border-slate-200 hover:shadow-md'
          }`}
        >
          <h3 className="text-base lg:text-lg font-bold text-[#2B5A7A] mb-1.5">Reach Out & Be Heard</h3>
          <p className="text-xs lg:text-sm text-slate-600">
            Start a conversation, ask for support, or simply express yourself.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default CommunityHeader;