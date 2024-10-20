import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface MyPostCardProps {
    id: string; // Add post ID for API calls
    title: string;
    content: string; // This should be HTML content
    date: string;
    link: string;
    image?: string; // Optional image
    isPublished: boolean; // To determine the publish status
}

const stripHtmlTags = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
};

const MyPostCard: React.FC<MyPostCardProps> = ({
    id,
    title,
    content,
    date,
    link,
    image,
    isPublished
}) => {
    const [published, setPublished] = useState(isPublished);
    const [token, setToken] = useState<string | null>(
        localStorage.getItem("ViewMyWay")
    );
    console.log(setToken)
    const togglePublish = async () => {
        try {
            const newPublishedStatus = !published;
            await axios.put(`${BACKEND_URL}/post/delete/${id}`, { published: newPublishedStatus }, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }
            );
            setPublished(newPublishedStatus);
        } catch (error) {
            console.error("Error updating publish status:", error);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    // Strip HTML tags from content for preview
    const plainTextContent = stripHtmlTags(content);
    const previewContent = plainTextContent.slice(0, 90) + (plainTextContent.length > 90 ? "..." : "");

    return (
        <div className="flex flex-col gap-4 bg-black border border-stone-800 rounded-lg p-4 transition duration-300 hover:border-white shadow-sm shadow-white max-w-sm">
            <div className="text-gray-500 text-xs">
                <span className="text-white">Published on {formatDate(date)}</span>
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

            {/* Content Preview */}
            <p className="text-gray-400 leading-relaxed text-sm">{previewContent}</p>

            {/* Publish/Unpublish Buttons */}
            <div className="flex justify-start space-x-2">
                <Link
                    to={link}
                    className="flex items-center bg-transparent text-white border border-white rounded-full py-1 px-4 transition duration-300 hover:bg-slate-200 hover:text-black"
                >
                    Edit
                    <svg
                        className="ml-2"
                        width="1rem"
                        height="2rem"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M16 4c0 0 0-1-1-2s-1.9-1-1.9-1l-1.1 1.1v-2.1h-12v16h12v-8l4-4zM6.3 11.4l-0.6-0.6 0.3-1.1 1.5 1.5-1.2 0.2zM7.2 9.5l-0.6-0.6 5.2-5.2c0.2 0.1 0.4 0.3 0.6 0.5zM14.1 2.5l-0.9 1c-0.2-0.2-0.4-0.3-0.6-0.5l0.9-0.9c0.1 0.1 0.3 0.2 0.6 0.4zM11 15h-10v-14h10v2.1l-5.9 5.9-1.1 4.1 4.1-1.1 2.9-3v6z" />
                    </svg>
                </Link>
                <button
                    className={`flex items-center bg-transparent text-white border border-white rounded-full py-1 px-4 transition duration-300 ${published ? "hover:bg-red-500" : "hover:bg-green-500"}`}
                    onClick={togglePublish}
                >
                    {published ? "Unpublish" : "Publish"}
                </button>
            </div>
        </div>
    );
};

export default MyPostCard;
