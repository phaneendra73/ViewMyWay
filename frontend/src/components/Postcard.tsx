import React from "react";
import { Link } from "react-router-dom";

interface PostCardProps {
  title: string;
  content: string;
  author: string;
  date: string;
  link: string;
  image?: string; // Optional image
}

const PostCard: React.FC<PostCardProps> = ({
  title,
  content,
  author,
  date,
  link,
  image
}) => {
  return (
    <div className="flex flex-col gap-4 bg-black border border-stone-800 rounded-lg p-4 transition duration-300 hover:border-white shadow-sm shadow-white max-w-sm">
       <div className="flex items-center space-x-2">
  <p className="text-gray-700 font-bold text-xl bg-white rounded-full w-8  flex items-center justify-center">
    {author[0]}
  </p>
  <p className="text-gray-500 text-xs">
    <span className="text-white">{author}</span> on {date}
  </p>
</div>

      {/* Title and Image */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        {image && (
          <img
            src={image}
            alt={title}
            className="w-16 h-16 rounded-lg object-cover shadow-md"
          />
        )}
        <span className="text-xl font-bold text-white">
        {title.length > 60 ? title.slice(0, 60) + "..." : title}
        </span>

      </div>

      {/* content */}
      <p className="text-gray-400 leading-relaxed text-sm">{content.slice(0,90)}...</p>



      {/* Read More Button */}
      <div className="flex justify-start">
        <Link
          to={link}
          className="flex items-center bg-transparent text-white border border-white rounded-full py-1 px-4 transition duration-300 hover:bg-slate-200 hover:text-black"
        >
          Read more
          <svg
            className="ml-1"
            width="12"
            height="12"
            viewBox="0 0 16 16"
            fill="currentColor"
            role="img"
            aria-hidden="true"
            focusable="false"
          >
            <path  
              transform="scale(0.5)"
              className="blueprint_een"
              d="M28,0H8L4.293,3.707C4.105,3.895,4,4.149,4,4.414V31c0,0.552,0.448,1,1,1h20
	            c0.552,0,1-0.448,1-1v-1l1-1h1c0.552,0,1-0.448,1-1V1C29,0.448,28.552,0,28,0z M6,4.828l2-2v24.465l-2,2V4.828z M6.707,30l2-2
	            h16.465l-2,2H6.707z M27,27H9V2h18V27z M23,9H13V8h10V9z M23,12H13v-1h10V12z M23,15H13v-1h10V15z"
            />
          </svg>
        </Link>
        <div className="flex items-center bg-transparent  py-1 px-4 transition duration-300 text-sm">{content.length/100} min read</div>
      </div>
    </div>
  );
};

export default PostCard;
