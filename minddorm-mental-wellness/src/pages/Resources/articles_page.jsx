import React, { useState, useMemo } from "react"; // 👈 ADDED useState and useMemo
import { Clock, Star } from "lucide-react";
import SupportOptions from "./support_condition";
import ResourcesNav from "../../components/ResourcesNav";

// 💡 1. Define ALL unique filter tags used in this page for the filter bar
const ALL_FILTER_TAGS = [
  "Anxiety", "Stress Management", "Study Tips", "Resilience", "Mental Strength",
  "Growth", "Mindfulness", "Meditation", "Focus", "Peace", "Indian Wisdom",
  "Heritage", "Self Power", "Divine", "Philosophy", "Cosmic"
];

const ArticlesPage = () => {
  // 2. ⚛️ STATE: Hook to hold the currently active filter tags
  const [activeTags, setActiveTags] = useState([]);

  // Mock data (RESOURCES_DATA equivalent)
  const articles = [
    {
      title: "Understanding Anxiety: A Student’s Guide",
      time: "8 min",
      rating: 4.8,
      desc: "Learn practical strategies to manage anxiety during exams and daily college life.",
      tags: ["Anxiety", "Stress Management", "Study Tips"],
      link: "https://www.innermined.com/post/understanding-anxiety-a-student-s-guide-to-turning-stress-into-strength?srsltid=AfmBOoqFLn5uQXCt3srFL7dMPrwvsaqiLgBmd-8SOyex5CLXirayIUud",
    },
    {
      title: "Building Resilience in University",
      time: "12 min",
      rating: 4.9,
      desc: "Develop mental strength and bounce back from academic and personal challenges.",
      tags: ["Resilience", "Mental Strength", "Growth"],
      link: "https://theglobalcollege.com/blog/building-resilience-students/",
    },
    {
      title: "The Power of Mindfulness for Students",
      time: "6 min",
      rating: 4.7,
      desc: "Simple mindfulness techniques to improve focus and reduce stress.",
      tags: ["Mindfulness", "Meditation", "Focus"],
      link: "https://childmind.org/article/the-power-of-mindfulness/",
    },
    {
      title: "The Art of Stillness: Ancient Wisdom for Inner Peace",
      time: "8 min",
      rating: 4.8,
      desc: "Explore timeless techniques from Indian heritage to cultivate peace amidst academic pressure.",
      tags: ["Peace", "Indian Wisdom", "Heritage"],
      link: "https://www.safalniveshak.com/the-art-of-stillness/",
    },
    {
      title: "Finding Your Inner Shakti: A Guide to Self-Power",
      time: "12 min",
      rating: 4.9,
      desc: "Tap into your innate ‘Shakti’ energy to build confidence and navigate university life.",
      tags: ["Self Power", "Divine", "Growth"],
      link: "https://kripalu.org/living-kripalu/shakti-power-within-you",
    },
    {
      title: "Cosmic Calm: Easing Anxiety with a Broader View",
      time: "12 min",
      rating: 4.7,
      desc: "Learn to reduce anxiety through cosmic philosophies and find your place in the universe.",
      tags: ["Philosophy", "Cosmic", "Peace"],
      link: "https://www.cafhglobal.com/meditation-and-anxiety/",
    },
  ];

  // 3. ⚙️ LOGIC: Function to toggle the tags
  const handleTagToggle = (tag) => {
    setActiveTags(prevTags => {
      if (prevTags.includes(tag)) {
        // Remove tag
        return prevTags.filter(t => t !== tag);
      } else {
        // Add tag
        return [...prevTags, tag];
      }
    });
  };

  // 4. ✨ MEMOIZED FILTERING: Filter the articles list based on activeTags (AND logic)
  const filteredArticles = useMemo(() => {
    if (activeTags.length === 0) {
      // If no tags are selected, show all articles
      return articles;
    }

    // Filter resources: must contain ALL active tags
    return articles.filter(article => 
      activeTags.every(activeTag => article.tags.includes(activeTag))
    );
  }, [articles, activeTags]); // Dependencies: articles data and activeTags state


  return (
    <div className="min-h-screen bg-gradient-to-b from-[#B5D8EB] to-[#F4F8FB] font-sans">
      <div className="max-w-6xl mx-auto px-4 py-10">
        
        <h1 className="text-5xl font-semibold text-[#000459] mb-2 text-center">
          Campus Mental Health Resources
        </h1>
        <p className="text-center text-gray-600 mb-8">
          From exam stress to social anxiety — find helpful articles designed for students navigating college life.
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
          {filteredArticles.map((article, i) => ( 
            <div
              key={i}
              className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold mb-2">{article.title}</h3>

              <div className="flex items-center text-sm text-gray-500 mb-2">
                <Clock size={14} className="mr-1" /> {article.time}
                <Star size={14} className="ml-3 mr-1 text-yellow-500" />{" "}
                {article.rating}
              </div>

              <p className="text-gray-600 text-sm mb-3">{article.desc}</p>

              {/* Resource Tags (Not clickable here, but show which tags are active) */}
              <div className="flex flex-wrap gap-2 mb-4">
                {article.tags.map((tag, index) => (
                  <span
                    key={`${tag}-${index}`}
                    className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-4 py-1 rounded-lg text-sm hover:bg-blue-700 transition"
              >
                Read Article
              </a>
            </div>
          ))}
          
          {/* Optional: Message if no results */}
          {filteredArticles.length === 0 && activeTags.length > 0 && (
             <p className="text-lg text-gray-500 col-span-full text-center p-8 border-2 border-dashed rounded-xl">
               No articles found matching all selected filters. Try removing a tag!
             </p>
          )}

        </div>

        <SupportOptions />
      </div>
    </div>
  );
};

export default ArticlesPage;











