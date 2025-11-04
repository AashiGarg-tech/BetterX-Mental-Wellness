import React, { useState, useMemo } from "react"; // 👈 ADDED useState and useMemo
import SupportOptions from "./support_condition";
import { Clock, PlayCircle } from "lucide-react";
import ResourcesNav from "../../components/ResourcesNav";

// 💡 1. Define ALL unique filter tags used in this page for the filter bar
const ALL_FILTER_TAGS = [
  "Meditation", "Yoga", "Chanting", "Relaxation", "Stress Relief", 
  "Anxiety", "Focus", "Vedic Chants", "Mindfulness"
];

export default function VideoPage() {
  // 2. ⚛️ STATE: Hook to hold the currently active filter tags
  const [activeTags, setActiveTags] = useState([]);

  // Mock data (with added tags)
  const videos = [
    {
      title: "Full Self Healing Meditation - OM SHANTI",
      views: "26M views",
      time: "15:40",
      desc: "This 15-minute basic meditation video is ideal for inner peace and calm.",
      thumb: "/images/omshanti.jpg",
      tags: ["Meditation", "Relaxation", "Chanting"], // 👈 Added Tags
      link: "https://www.youtube.com/watch?v=YWDRFZFCrGE",
    },
    {
      title: "Morning Surya Namaskar Meditation",
      views: "10M views",
      time: "27:22",
      desc: "Practice the 12 postures of Surya Namaskar with sacred Vedic chants.",
      thumb: "/images/surya_namaskar.png",
      tags: ["Yoga", "Meditation", "Vedic Chants"], // 👈 Added Tags
      link: "https://www.youtube.com/watch?v=7s0E8ecWncM",
    },
    {
      title: "Progressive Muscle Relaxation",
      views: "4M views",
      time: "15:52",
      desc: "Learn this evidence-based technique to release physical tension and stress.",
      thumb: "/images/pmr.avif",
      tags: ["Stress Relief", "Relaxation", "Anxiety"], // 👈 Added Tags
      link: "https://www.youtube.com/watch?v=86HUcX8ZtAk",
    },
    {
      title: "10-Minute Gayatri Mantra for Mind & Soul",
      views: "3.1M views",
      time: "10:50",
      desc: "Chanting Gayatri Mantra regularly can establish and stabilize the mind.",
      thumb: "/images/gaytrimantra.jpg",
      tags: ["Chanting", "Vedic Chants", "Focus"], // 👈 Added Tags
      link: "https://www.youtube.com/watch?v=8lxDnvAH4tQ",
    },
    {
      title: "Exam Success Meditation",
      views: "1.6M views",
      time: "10:01",
      desc: "Quick breathing techniques to calm pre-exam nerves.",
      thumb: "/images/exam_success.jpg",
      tags: ["Focus", "Stress Relief", "Anxiety"], // 👈 Added Tags
      link: "https://www.youtube.com/watch?v=AtF0T2fPvbI",
    },
    {
      title: "10-Minute Morning Yoga for Mental Clarity",
      views: "69K views",
      time: "12:01",
      desc: "Start your day with gentle movements to center your mind and body.",
      thumb: "/images/morning_yoga.jpg",
      tags: ["Yoga", "Mindfulness", "Focus"], // 👈 Added Tags
      link: "https://youtu.be/WrM12NYA7wg",
    },
  ];

  // 3. ⚙️ LOGIC: Function to toggle the tags
  const handleTagToggle = (tag) => {
    setActiveTags(prevTags => {
      if (prevTags.includes(tag)) {
        return prevTags.filter(t => t !== tag);
      } else {
        return [...prevTags, tag];
      }
    });
  };

  // 4. ✨ MEMOIZED FILTERING: Filter the videos list based on activeTags (AND logic)
  const filteredVideos = useMemo(() => {
    if (activeTags.length === 0) {
      return videos;
    }

    // Filter resources: must contain ALL active tags
    return videos.filter(video => 
      activeTags.every(activeTag => video.tags.includes(activeTag))
    );
  }, [videos, activeTags]); // Dependencies: videos data and activeTags state


  return (
    <div className="min-h-screen bg-gradient-to-b from-[#B5D8EB] to-[#F4F8FB] font-sans">
      <div className="max-w-6xl mx-auto px-4 py-10">
      
        <h1 className="text-5xl font-semibold text-[#000459] mb-2 text-center">
          Campus Mental Health Resources
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Watch mindfulness and relaxation videos designed to help you de-stress and focus.
        </p>
        
        <ResourcesNav />

        {/* 🌟 5. NEW: FILTER TAGS CONTAINER 🌟 */}
        <div className="flex flex-wrap gap-2 my-8 p-4 bg-gray-50 rounded-lg shadow-inner border border-gray-100">
          <span className="font-semibold text-gray-700 mr-2 py-2">Filter by Topic:</span>
          
          {ALL_FILTER_TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => handleTagToggle(tag)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                ${activeTags.includes(tag)
                  ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-300 hover:text-blue-600'
                }
              `}
            >
              {tag}
            </button>
          ))}
          
          {/* Clear Filter Button */}
          {activeTags.length > 0 && (
            <button
              onClick={() => setActiveTags([])}
              className="ml-4 px-4 py-2 rounded-full text-sm font-medium text-red-500 hover:bg-red-50 transition duration-200"
            >
              Clear Filters ({activeTags.length})
            </button>
          )}
        </div>
        {/* 🌟 END OF FILTER TAGS CONTAINER 🌟 */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 6. USE THE FILTERED LIST HERE */}
          {filteredVideos.map((v, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden">
              <div className="relative">
                <img src={v.thumb} alt={v.title} className="w-full h-40 object-cover" />
                <a
                  href={v.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex justify-center items-center bg-black/40 hover:bg-black/60 transition"
                >
                  <PlayCircle size={48} className="text-white" />
                </a>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-1">{v.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{v.desc}</p>
                
                {/* Display resource tags */}
                <div className="flex flex-wrap gap-2 text-xs text-blue-700 mb-2">
                    {v.tags.map(tag => (
                        <span key={tag} className="bg-blue-100 px-2 py-0.5 rounded-md">{tag}</span>
                    ))}
                </div>
                
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>{v.views}</span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} /> {v.time}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Optional: Message if no results */}
          {filteredVideos.length === 0 && activeTags.length > 0 && (
             <p className="text-lg text-gray-500 col-span-full text-center p-8 border-2 border-dashed rounded-xl">
               No videos found matching all selected filters. Try removing a tag!
             </p>
          )}

        </div>

        <SupportOptions />
      </div>
    </div>
  );
}











