import React from "react";
import { Link } from "react-router-dom";

interface CardProps {
  title: string;
  description: string;
  link: string;
  className?: string; // Additional class names
}

const NavCard: React.FC<CardProps> = ({
  title,
  description,
  link,
  className = "",
}) => {
  return (
    <Link
      to={link}
      className={`block rounded-lg overflow-hidden transition-transform duration-1000 scale-90 hover:scale-95 ${className} opacity-85 `}
    >
      <div className="relative z-10 p-6 text-black bg-white  flex flex-col h-full transition-all duration-1000 ease-in-out hover:border-white hover:rounded-3xl">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-zinc-700 flex-1">{description}</p>
      </div>
    </Link>



  );
};

export default NavCard;
