import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import Footer from "../components/Footer";
import Nav from "../components/Nav";

const PostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<{ title: string; date: string; content: string; author: string } | null>(null);

  useEffect(() => {
    const fetchPost = () => {
      const simulatedPost = {
        title: "Sample Post Title",
        date: "October 10, 2024",
        content: ` <p>haufdhs<span style="color: rgb(255, 255, 0);"> udsifuidsyf dsufdyuf gdgy n</span>iur ttyru tyreytrieytuyr ertyrt<span style="color: rgb(255, 255, 255);"> iueritiuerty yreuityuertyerut </span><span style="color: rgb(102, 185, 102);">ieruityr reyutyeruityirt uryetiu eryuyru ytrutyrueyteriuyi</span></p><p><br></p>`,
        author: "Jane Doe",
      };
      setPost(simulatedPost);
    };

    fetchPost();
  }, [id]);

  useEffect(() => {
    if (post) {
      const quill = new Quill("#quill-viewer", {
        theme: "snow",
        readOnly: true,
        modules: { toolbar: false }
      });
      quill.clipboard.dangerouslyPasteHTML(post.content);
    }
  }, [post]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Nav />
      <div className="flex flex-col min-h-screen text-white bg-black">
        <div className="flex-grow p-8 lg:p-20 mt-10 lg:mt-0">
          <div className="border border-white p-6 rounded-lg shadow-lg mb-8 relative">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
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
            {/* Quill Viewer */}
            <div id="quill-viewer" className="ql-container ql-snow" style={{ minHeight: "200px" }}></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PostPage;
