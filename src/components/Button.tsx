import React, { useState } from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => Promise<void>; // Change to a Promise for async operations
  className?: string;
  children: React.ReactNode;
  to?: string; // Optional prop for Link
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  onClick,
  className = "",
  children,
  to, // Accept a 'to' prop for Link
}) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (onClick) {
      setLoading(true);
      await onClick(); // Wait for the onClick function to complete
      setLoading(false);
    }
  };

  const buttonStyles = `bg-gray-100 text-black font-bold py-2 px-4 rounded focus:outline-none hover:bg-gray-300 transition duration-300 ${className}`;

  // If 'to' prop is provided, render a Link
  if (to) {
    return (
      <Link to={to} className={buttonStyles} onClick={handleClick}>
        {loading ? "Loading..." : children}
      </Link>
    );
  }

  // Otherwise, render a regular button
  return (
    <button type={type} onClick={handleClick} className={buttonStyles} disabled={loading}>
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;
