import React from 'react';
import { Link } from 'react-router-dom';

const CommunityHeader = ({ activeTab }) => {

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


      {/* Tab Navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
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
