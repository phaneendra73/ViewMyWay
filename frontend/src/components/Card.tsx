import React from "react";
import { Link } from "react-router-dom";

interface CardProps {
  title: string;
  description: string;
  link: string;
  bgColor?: string; // Background color
  className? : string // Row span
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  link,
 // bgColor = "bg-gray-100", // Default background color
  className=""
}) => {
  return (
  
      <div className={`relative rounded-lg shadow-md overflow-hidden ${className}`}>
        <div className="relative z-10 p-4 bg-gray-100 bg-opacity-80 rounded-lg">
          <h3 className="text-lg font-semibold text-black">{title}</h3>
          <p className="text-sm text-gray-700">{description}</p>
          <Link
            to={link}
            className="mt-3 inline-block px-4 py-2  bg-black text-white rounded-lg hover:bg-white hover:text-black transition duration-300"
          >
            Visit
          </Link>
        </div>
      </div>
  
    
  );
};

export default Card;
