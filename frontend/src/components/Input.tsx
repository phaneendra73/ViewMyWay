import React, { useState } from "react";

interface InputFieldProps {
  type: string;
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string; // Optional error message prop
}

const Input: React.FC<InputFieldProps> = ({ type, id, label, value, onChange, errorMessage }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (value === '') {
      setIsFocused(false);
    }
  };

  return (
    <div className="mb-6 relative">
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`shadow appearance-none border rounded w-full py-2 px-3 bg-black text-white leading-tight focus:outline-none transition-all duration-200 ${errorMessage ? 'border-red-500' : 'border-white'}`}
        style={{ paddingTop: '1.5rem', paddingBottom: '0.5rem' }} // Adjust for label positioning
      />
      <label 
        htmlFor={id} 
        className={`absolute left-3 top-2 text-white text-sm transition-all duration-200 ${isFocused || value ? 'transform -translate-y-4 scale-100' : ''} ${errorMessage ? 'text-red-500' : ''}`}
        style={{
          backgroundColor: 'black', // Matches the input background
          padding: '0 0.2rem', // Padding for label to fit inside the border
        }}
      >
        {label}
      </label>
      {errorMessage && (
        <p className="text-red-500 text-sm mt-1 flex items-center">
          ❗{errorMessage}
        </p>
      )}
    </div>
  );
};

export default Input;
