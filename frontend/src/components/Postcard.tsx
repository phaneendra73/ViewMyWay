import React from "react";
import { Link } from "react-router-dom";

interface PostCardProps {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  link: string;
  image?: string; // Optional image
}

const PostCard: React.FC<PostCardProps> = ({
  title,
  excerpt,
  author,
  date,
  link,
  image,
}) => {
  return (
    <div className="flex flex-col gap-6 bg-black border border-stone-800 rounded-lg  p-6 transition duration-300 hover:border-white shadow-sm shadow-white">
      {/* Title and Image */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {image && (
          <img
            src={image}
            alt={title}
            className="w-20 h-20 rounded-lg object-cover shadow-md"
          />
        )}
        <span className="text-2xl font-bold text-white">{title}</span>
      </div>

      {/* Excerpt */}
      <p className="text-gray-400 leading-relaxed">{excerpt}</p>

      {/* Author and Date */}
      <p className="text-gray-500 text-sm">
        By <span className="text-white">{author}</span> on {date}
      </p>

      {/* Read More Button */}
      <div className="flex justify-start">
        <Link
          to={link}
          className="flex items-center bg-transparent text-white border border-white rounded-full py-2 px-5 transition duration-300 hover:bg-slate-200 hover:text-black"
        >
          Read more
          <svg
            className="ml-2"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
            role="img"
            aria-hidden="true"
            focusable="false"
          >
            <path  
              transform="scale(0.51)"
              className="blueprint_een"
              d="M28,0H8L4.293,3.707C4.105,3.895,4,4.149,4,4.414V31c0,0.552,0.448,1,1,1h20
	c0.552,0,1-0.448,1-1v-1l1-1h1c0.552,0,1-0.448,1-1V1C29,0.448,28.552,0,28,0z M6,4.828l2-2v24.465l-2,2V4.828z M6.707,30l2-2
	h16.465l-2,2H6.707z M27,27H9V2h18V27z M23,9H13V8h10V9z M23,12H13v-1h10V12z M23,15H13v-1h10V15z"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
