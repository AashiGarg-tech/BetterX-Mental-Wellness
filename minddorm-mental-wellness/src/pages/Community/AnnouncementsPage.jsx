import React from 'react';
import {
  CalendarIcon,
  HeartIcon,
  SparklesIcon,
  SunIcon,
  PencilIcon
} from '@heroicons/react/24/solid';
import CommunityHeader from './CommunityHeader';

const AnnouncementsPage = () => {
  const announcements = [
    {
      id: 5,
      title: 'November 15-22 – Art for Awareness Week (suggested date)',
      description:
        "Express what words can't. Submit your artwork to help others feel seen and understood.",
      icon: <PencilIcon className="h-6 w-6 text-[#2B5A7A]" />
    },
    {
      id: 4,
      title: 'May – Mental Health Awareness Month',
      description:
        'A full month to run student-led campaigns, share resources, and create safe spaces for open conversations.',
      icon: <CalendarIcon className="h-6 w-6 text-[#2B5A7A]" />
    },
    {
      id: 2,
      title: 'June 21 – International Yoga Day',
      description:
        "Let's breathe in and out together. Exhale the stress of the month and return to your center.",
      icon: <SunIcon className="h-6 w-6 text-[#2B5A7A]" />
    },
    {
      id: 3,
      title: 'September 7-13 – Suicide Prevention Week',
      description:
        "We're sharing stories of hope, healing, and quiet courage. Let's remind each other: you're not alone.",
      icon: <SparklesIcon className="h-6 w-6 text-[#2B5A7A]" />
    },
    {
      id: 1,
      title: 'October 10 – World Mental Health Day',
      description:
        "Today, we're hosting live sessions and gentle yoga to honor this day. Join us to reflect, connect, and breathe.",
      icon: <HeartIcon className="h-6 w-6 text-[#2B5A7A]" />
    }
  ];

  return (
    <div className="min-h-screen font-sans bg-gradient-to-b from-[#B5D8EB] to-[#F4F8FB]">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <CommunityHeader activeTab="announcements" />

        {/* Content Area */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 min-h-96">
          <div className="flex items-center justify-between mb-10 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full flex items-center justify-center">
                <img src="/announcements.png" alt="Announcements" className="w-20 h-20 object-contain" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#2B5A7A]">Announcements</h2>
                <p className="text-sm text-gray-500">Stay updated with community events and news</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                className="flex items-start gap-4 border-b border-slate-200 pb-6 last:border-b-0"
              >
                <div className="flex-shrink-0 mt-1">{announcement.icon}</div>
                <div>
                  <h3 className="font-bold text-[#2B5A7A] mb-2">
                    {announcement.title}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {announcement.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-10 text-gray-600 text-sm">
          <p>Don't worry Be happy</p>
        </footer>
      </div>
    </div>
  );
};

export default AnnouncementsPage;
