import React, { useState, useMemo } from "react"; // 👈 ADDED useState and useMemo
import SupportOptions from "./support_condition";
import { Music2, Clock, Play } from "lucide-react";
import ResourcesNav from "../../components/ResourcesNav";

// 💡 1. Define ALL unique filter tags used in this page for the filter bar
const ALL_FILTER_TAGS = [
  "Study Focus", "Lo-Fi", "Nature Sounds", "Relaxation", "Mindfulness", 
  "Meditation", "Indian Classical", "Vedic Chants", "Ambient"
];

export default function AudioPage() {
  // 2. ⚛️ STATE: Hook to hold the currently active filter tags
  const [activeTags, setActiveTags] = useState([]);

  // Mock data (with added tags)
  const audios = [
    {
      title: "Study Focus: Lo-Fi Beats",
      desc: "Gentle lofi music to help you concentrate while studying.",
      tracks: "500 tracks",
      duration: "20hrs",
      tags: ["Study Focus", "Lo-Fi", "Ambient"], // 👈 Added Tags
      link: "https://open.spotify.com/playlist/0vvXsWCC9xrXsKd4FyS8kM",
    },
    {
      title: "Calming Nature Sounds",
      desc: "Peaceful sounds of rain, ocean waves, and forest ambiance for relaxation.",
      tracks: "300 tracks",
      duration: "14hrs",
      tags: ["Nature Sounds", "Relaxation", "Ambient"], // 👈 Added Tags
      link: "https://open.spotify.com/playlist/2sWwKJKAznIkvjoFRJ3ag3",
    },
    {
      title: "Meditation & Mindfulness",
      desc: "Peaceful meditations and ambient sounds for mindfulness practice.",
      tracks: "182 tracks",
      duration: "12hrs",
      tags: ["Mindfulness", "Meditation", "Ambient"], // 👈 Added Tags
      link: "https://open.spotify.com/playlist/43j9sAZenNQcQ5A4ITyJ82",
    },
    {
      title: "Ragas for Relaxation",
      desc: "Immerse yourself in the timeless beauty of Indian classical ragas.",
      tracks: "69 tracks",
      duration: "8hrs",
      tags: ["Indian Classical", "Relaxation"], // 👈 Added Tags
      link: "https://open.spotify.com/playlist/37i9dQZF1DX0Ggu1WtO1dT",
    },
    {
      title: "Sacred Flute Meditations",
      desc: "Serene and soulful melodies of the Bansuri (Indian bamboo flute).",
      tracks: "208 tracks",
      duration: "9hr",
      tags: ["Meditation", "Indian Classical", "Ambient"], // 👈 Added Tags
      link: "https://open.spotify.com/playlist/66oeOdZOJ6XYP92kkibWYm",
    },
    {
      title: "Echoes of the Himalayas",
      desc: "Grounding Vedic chants and resonant vibrations for mental focus.",
      tracks: "12 tracks",
      duration: "45 min",
      tags: ["Vedic Chants", "Meditation", "Study Focus"], // 👈 Added Tags
      link: "https://open.spotify.com/album/4ZHUK6G1kJmg2WrawAH7Gt",
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

  // 4. ✨ MEMOIZED FILTERING: Filter the audios list based on activeTags (AND logic)
  const filteredAudios = useMemo(() => {
    if (activeTags.length === 0) {
      return audios;
    }

    // Filter resources: must contain ALL active tags
    return audios.filter(audio => 
      activeTags.every(activeTag => audio.tags.includes(activeTag))
    );
  }, [audios, activeTags]); // Dependencies: audios data and activeTags state


  return (
    <div className="min-h-screen bg-gradient-to-b from-[#B5D8EB] to-[#F4F8FB] font-sans">
      <div className="max-w-6xl mx-auto px-4 py-10">
        
        <h1 className="text-5xl font-semibold text-[#000459] mb-2 text-center">
          Campus Mental Health Resources
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Listen to calming audio designed for study focus, relaxation, and mindfulness.
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
          {filteredAudios.map((a, i) => (
            <div key={i} className="bg-gradient-to-b from-blue-50 to-blue-100 p-5 rounded-2xl shadow-md hover:shadow-lg transition text-center">
              <Music2 className="text-blue-600 mx-auto mb-3" size={24} />
              <h3 className="text-lg font-semibold mb-2">{a.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{a.desc}</p>

              {/* Optional: Display resource tags */}
              <div className="flex justify-center flex-wrap gap-2 text-xs text-blue-700 mb-4">
                {a.tags.map(tag => (
                    <span key={tag} className="bg-blue-200/50 px-2 py-0.5 rounded-full">{tag}</span>
                ))}
              </div>


              <div className="flex justify-center gap-6 text-sm text-gray-500 mb-4">
                <span>{a.tracks}</span>
                <span className="flex items-center gap-1"><Clock size={14}/> {a.duration}</span>
              </div>
              <a
                href={a.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
              >
                <Play size={16}/> Play
              </a>
            </div>
          ))}

          {/* Optional: Message if no results */}
          {filteredAudios.length === 0 && activeTags.length > 0 && (
             <p className="text-lg text-gray-500 col-span-full text-center p-8 border-2 border-dashed rounded-xl">
               No audio resources found matching all selected filters. Try removing a tag!
             </p>
          )}

        </div>

        <SupportOptions />
      </div>
    </div>
  );
}




