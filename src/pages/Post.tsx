import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import { usePost } from "../hooks";
import { motion } from "framer-motion"; // Import motion from Framer Motion
import Skeleton from "../Skeletons/Post"; // Import the Skeleton component
import "../index.css";

const PostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, post } = usePost(id === undefined ? "" : id);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Hide after 2 seconds
  };

  // Initialize Quill only when the post is loaded
  useEffect(() => {
    if (post) {
      const quill = new Quill("#quill-viewer", {
        theme: "snow",
        readOnly: true,
        modules: { toolbar: false },
      });
      quill.clipboard.dangerouslyPasteHTML(post.content);
    }
  }, [post]);

  // Loading state
  if (loading) {
    return (
      <>
        <Nav />
        <div className="flex flex-col  p-8 lg:p-20 mt-10 lg:mt-0  h-screen text-white">
          <div className="w-full  p-8">
            <Skeleton height="36px" width="80%" className="mb-4" /> {/* Skeleton for title */}
            <Skeleton height="20px" width="60%" className="mb-2" /> {/* Skeleton for author */}
            <Skeleton height="12px" width="100%" className="my-4" /> {/* Skeleton for line */}
            <Skeleton height="200px" className="my-4" /> {/* Skeleton for content */}
          </div>
        </div>
      </>
    );
  }

  if (!post) {
    return <div className="text-red-500 text-center mt-5">Post not found.</div>;
  }

  return (
    <>
      <Nav />
      <div className="flex flex-col min-h-screen text-white bg-black">
        <div className="flex-grow p-8 lg:p-20 mt-10 lg:mt-0">
          <motion.div
            className="border border-white p-6 rounded-lg shadow-lg mb-8 relative"
            initial={{ opacity: 0, y: 20 }} // Initial state
            animate={{ opacity: 1, y: 0 }} // Animate to this state
            transition={{ duration: 0.5 }} // Transition duration
          >
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
                <p className="text-sm text-gray-400 mb-4">by {post?.author?.name || " "}</p>
              </div>
              <div className="relative">
                {!copied && <button
                  className="bg-transparent border border-white text-white py-1 px-3 rounded-full hover:bg-white hover:text-black transition duration-300"
                  onClick={handleShare}
                >
                  Share
                </button>}
                {copied && (
                  <div className="bg-transparent border border-white text-white py-1 px-3 rounded-full hover:bg-white hover:text-black transition duration-300"
                  >
                    Copied
                  </div>
                )}
              </div>
            </div>
            <hr className="border-t border-white my-4" />
            {/* Quill Viewer */}
            <div id="quill-viewer" className="ql-container ql-snow" style={{ minHeight: "200px" }}></div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PostPage;
