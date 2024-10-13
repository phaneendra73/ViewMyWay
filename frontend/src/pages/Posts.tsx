import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import Notification from "../components/Notification";
import PostCard from "../components/Postcard"; // Import your PostCard component
import { usePosts } from "../hooks";
import SkePosts from "../skeletons/Posts";



const topics = ["React", "CSS", "JavaScript", "Web Development", "Programming"];
const authors = ["John Doe", "Jane Smith", "Alice Johnson", "Bob Brown"];

const Posts: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const {loading, posts, error} = usePosts()
  if(loading){
    return <SkePosts/>
    
  }
  if(error){
      return <>
      <Notification 
      message={error}
      type="error"
      onClose={()=>{
        
      }}></Notification>
        </>
  }

  return (
    <>
      <Nav />
      <div className="flex flex-col lg:flex-row min-h-screen text-white">
        {/* Sidebar for Topics and Authors */}
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
              {topics.map((topic, index) => (
                <li key={index}>
                  <Link
                    to={`/topics/${topic.toLowerCase()}`}
                    className="flex items-center bg-transparent text-white border border-white rounded-full py-1 px-3 transition duration-300 hover:bg-slate-200 hover:text-black"
                  >
                    {topic}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Authors</h2>
            <ul className="flex flex-wrap gap-3">
              {authors.map((author, index) => (
                <li key={index}>
                  <Link
                    to={`/author/${author.toLowerCase()}`}
                    className="flex items-center bg-transparent text-white border border-white rounded-full py-1 px-3 transition duration-300 hover:bg-slate-200 hover:text-black"
                  >
                    {author}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="flex-grow p-8 lg:p-16 mt-20 lg:mt-0"> {/* Adjusted for floating nav */}
          <button
            className="lg:hidden mb-4 text-white"
            onClick={() => setIsSidebarOpen(true)}
          >
            Open Sidebar
          </button>
          <h1 className="text-2xl font-bold mb-6">Blog Posts</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                title={post.title}
                content={post.content}
                author={post.author.name == null ? "Anonymous" : post.author.name}
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
