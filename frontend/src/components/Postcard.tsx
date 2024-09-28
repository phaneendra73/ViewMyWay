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
    <div className="flex flex-col gap-6 bg-slate-950 rounded-lg shadow-lg p-5">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          {image && (
            <img src={image} alt={title} className="w-5 h-5" />
          )}
          <span className="text-2xl font-bold text-white">{title}</span>
        </div>
        <p className="text-gray-300">{excerpt}</p>
        <p className="text-gray-400 text-sm">By {author} on {date}</p>
      </div>
      <Link
        to={link}
        className="mt-auto flex items-center justify-center bg-gray-500 text-white rounded-lg py-2 px-4 transition duration-200 hover:bg-gray-400"
      >
        Read more
        <svg className="ml-2" width="16" height="16" viewBox="0 0 16 16" fill="#ffffff">
          <path d="M5.46967 11.4697C5.17678 11.7626 5.17678 12.2374 5.46967 12.5303C5.76256 12.8232 6.23744 12.8232 6.53033 12.5303L10.5303 8.53033C10.8207 8.23999 10.8236 7.77014 10.5368 7.47624L6.63419 3.47624C6.34492 3.17976 5.87009 3.17391 5.57361 3.46318C5.27713 3.75244 5.27128 4.22728 5.56054 4.52376L8.94583 7.99351L5.46967 11.4697Z" />
        </svg>
      </Link>
    </div>
  );
};

export default PostCard;
