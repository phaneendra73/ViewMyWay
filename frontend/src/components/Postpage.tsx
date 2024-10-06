import React from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import Texteditor from "../components/Texteditor";

const posts = [
  {
    id: "1",
    title: "React Conf 2024 Recap",
    date: "May 22, 2024",
    content: `
      Last week we hosted React Conf 2024, a two-day conference in Henderson, Nevada. 
      The event was packed with insightful talks, hands-on workshops, and networking opportunities. 
      Here are some of the highlights:
      
      **Day 1 Highlights:**
      - Keynote by Dan Abramov on the future of React.
      - Workshop on React Server Components.
      - Panel discussion on state management with Redux and Recoil.
      
      **Day 2 Highlights:**
      - Talk on performance optimization in React applications.
      - Deep dive into React Native for mobile development.
      - Closing keynote by Sophie Alpert on the evolution of React.

      We look forward to seeing you at next year's conference!
    `,
    author: "John Doe",
  },
  // Add more posts as needed...
];

const PostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = posts.find((post) => post.id === id);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <>
      <Nav />
      <div className="flex flex-col min-h-screen text-white bg-black">
        <div className="flex-grow p-8 lg:p-20 mt-10 lg:mt-0">
          <div className="border border-white p-6 rounded-lg shadow-lg mb-8 relative">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
                <p className="text-sm text-gray-400 mb-4">{post.date} by {post.author}</p>
              </div>
              <button
                className="bg-transparent border border-white text-white py-1 px-3 rounded-full hover:bg-white hover:text-black transition duration-300"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Copied!");
                }}
              >
                Share
              </button>
            </div>
            <hr className="border-t border-white my-4" />
            <div className="prose prose-invert max-w-none">
              <p>{post.content}</p>
            </div>
          </div>
          <Texteditor />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PostPage;
