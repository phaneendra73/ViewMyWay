import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import PostCard from "../components/Postcard"; // Import your PostCard component

const posts = [
  {
    title: "React Conf 2024 Recap",
    date: "May 22, 2024",
    excerpt: "Last week we hosted React Conf 2024, a two-day conference in Henderson, Nevada...",
    author: "John Doe", // Add author for each post
    link: "/post/1",
  },
  {
    title: "React Conf 2024 Recap",
    date: "May 22, 2024",
    excerpt: "Last week we hosted React Conf 2024, a two-day conference in Henderson, Nevada...",
    author: "John Doe", // Add author for each post
    link: "/post/1",
  },
  {
    title: "React Conf 2024 Recap",
    date: "May 22, 2024",
    excerpt: "Last week we hosted React Conf 2024, a two-day conference in Henderson, Nevada...",
    author: "John Doe", // Add author for each post
    link: "/post/1",
  },
  {
    title: "React Conf 2024 Recap",
    date: "May 22, 2024",
    excerpt: "Last week we hosted React Conf 2024, a two-day conference in Henderson, Nevada...",
    author: "John Doe", // Add author for each post
    link: "/post/1",
  },
  {
    title: "React Conf 2024 Recap",
    date: "May 22, 2024",
    excerpt: "Last week we hosted React Conf 2024, a two-day conference in Henderson, Nevada...",
    author: "John Doe", // Add author for each post
    link: "/post/1",
  },
  {
    title: "React Conf 2024 Recap",
    date: "May 22, 2024",
    excerpt: "Last week we hosted React Conf 2024, a two-day conference in Henderson, Nevada...",
    author: "John Doe", // Add author for each post
    link: "/post/1",
  },
  {
    title: "React Conf 2024 Recap",
    date: "May 22, 2024",
    excerpt: "Last week we hosted React Conf 2024, a two-day conference in Henderson, Nevada...",
    author: "John Doe", // Add author for each post
    link: "/post/1",
  },
  // Add more posts as needed...
];

const topics = ["React", "CSS", "JavaScript", "Web Development", "Programming"];
const authors = ["John Doe", "Jane Smith", "Alice Johnson", "Bob Brown"];

const PostsPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
          <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
          <div className="grid grid-cols-1 gap-6">
            {posts.map((post, index) => (
              <PostCard
                key={index}
                title={post.title}
                excerpt={post.excerpt}
                author={post.author}
                date={post.date}
                link={post.link}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PostsPage;
