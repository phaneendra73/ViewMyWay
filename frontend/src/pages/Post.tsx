import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import PostCard from "../components/PostCard"; // Import your PostCard component

const posts = [
  {
    title: "React Conf 2024 Recap",
    date: "May 22, 2024",
    excerpt: "Last week we hosted React Conf 2024, a two-day conference in Henderson, Nevada...",
    author: "John Doe", // Add author for each post
    link: "/post/1",
  },
  {
    title: "Understanding React",
    date: "April 10, 2024",
    excerpt: "A deep dive into the fundamentals of React.js.",
    author: "Jane Smith",
    link: "/post/2",
  },
  // Add more posts as needed...
];

const topics = ["React", "CSS", "JavaScript", "Web Development", "Programming"];
const authors = ["John Doe", "Jane Smith", "Alice Johnson", "Bob Brown"];

const PostsPage: React.FC = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-screen text-white">
        <Nav />

        {/* Sidebar for Topics and Authors */}
        <div className="hidden lg:block w-1/4 bg-slate-950 p-5 sticky top-10 h-screen">
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Topics</h2>
            <ul className="space-y-2">
              {topics.map((topic, index) => (
                <li key={index}>
                  <Link to={`/topics/${topic.toLowerCase()}`} className="text-gray-400 hover:underline">
                    {topic}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Authors</h2>
            <ul className="space-y-2">
              {authors.map((author, index) => (
                <li key={index}>
                  <Link to={`/authors/${author.toLowerCase().replace(" ", "-")}`} className="text-gray-400 hover:underline">
                    {author}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="flex-grow p-8 lg:p-16 overflow-y-auto">
          <h1 className="text-4xl font-bold mb-6">Blog Posts</h1>
          <div className="grid grid-cols-1 gap-6">
            {posts.map((post, index) => (
              <PostCard
                key={index}
                title={post.title}
                excerpt={post.excerpt}
                author={post.author}
                date={post.date}
                link={post.link}
                // You can add an image here if needed
                // image={post.image}
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
