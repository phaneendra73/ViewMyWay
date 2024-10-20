import React from "react";
import { Link } from "react-router-dom";

interface CardProps {
  title: string;
  description: string;
  link: string;
  className?: string; // Additional class names
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  link,
  className = "",
}) => {
  return (
    <Link
      to={link}
      className={`block rounded-lg overflow-hidden transition-transform duration-300 scale-90 hover:scale-95 ${className}`}
    >
      <div className="relative z-10 p-6 border border-slate-300 text-white bg-zinc-950  flex flex-col h-full hover:border-white transition-all duration-300">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-300 flex-1">{description}</p>
      </div>
    </Link>
  );
};

export default Card;
