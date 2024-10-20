import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import Notification from "../components/Notification";
import PostCard from "../components/Postcard"; // Import your PostCard component
import { usePosts, useTags } from "../hooks";
import SkePosts from "../Skeletons/Posts";

// Define Tag interface
interface Tag {
  id: number
  name: string;
}

const Posts: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<number | null>(null); // State for selected tag
  const navigate = useNavigate();
  const { loading, posts, error } = usePosts();
  const { tags, tagerror } = useTags();

  useEffect(() => {
    if (error && (error.includes("Unauthorized") || error.includes("log in"))) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error, navigate]);

  if (loading) {
    return <SkePosts />;
  }

  if (error || tagerror) {
    return (
      <Notification
        message={error || tagerror}
        type="error"
        onClose={() => { }} // Optional close function
      />
    );
  }

  // Filter posts based on selected tag
  const filteredPosts = selectedTag
    ? posts.filter(post => post.tags?.some(tag => tag.id === selectedTag))
    : posts;

  return (
    <>
      <Nav />
      <div className="flex flex-col lg:flex-row min-h-screen text-white">
        {/* Sidebar for Topics and Tags */}
        <div className={`fixed lg:sticky top-0 lg:top-20 left-0 lg:left-auto w-4/5 lg:w-1/5 border border-stone-800 shadow-sm shadow-white rounded-lg p-5 h-screen mt-20 lg:mt-0 bg-black transition-transform transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
          <button
            className="lg:hidden absolute top-4 right-4 text-white"
            onClick={() => setIsSidebarOpen(false)}
          >
            Close
          </button>
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Topics</h2>
            <ul className="flex flex-wrap gap-3">
              {(tags || []).map((tag: Tag) => (  // Ensure tags is treated as an array
                <li key={tag.id}>
                  <button
                    className={`flex items-center rounded-full py-1 px-3 border border-white
                    ${selectedTag === tag.id ? "font-bold bg-white text-black" : "bg-black text-white"}`}
                    onClick={() => setSelectedTag(selectedTag === tag.id ? null : tag.id)}
                  >
                    {tag.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="flex-grow p-8 lg:p-16 mt-20 lg:mt-0">
          <button
            className="lg:hidden mb-4 text-white"
            onClick={() => setIsSidebarOpen(true)}
          >
            Open Sidebar
          </button>
          <h1 className="text-2xl font-bold mb-6">Blog Posts</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <PostCard
                key={post.id}
                title={post.title}
                content={post.content}
                author={post?.author?.name || "Anonymous"}
                date={post.createdAt}
                link={`/post/get/${post.id}`}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Posts;
