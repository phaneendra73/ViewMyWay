import React, { useState } from "react";

interface InputFieldProps {
  type: string;
  id: string;
  label: string;
  value: string | null | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string; // Optional error message prop
}

const Input: React.FC<InputFieldProps> = ({ 
  type, 
  id, 
  label, 
  value, 
  onChange, 
  errorMessage 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (value === '') {
      setIsFocused(false);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-6 relative">
      <input
        type={showPassword && type === 'password' ? 'text' : type}
        id={id}
        value={value === null ? "" : value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`shadow appearance-none border rounded w-full py-2 px-3 bg-black text-white leading-tight focus:outline-none transition-all duration-200 ${errorMessage ? 'border-red-500' : 'border-white'}`}
        style={{ paddingTop: '1.0rem', paddingBottom: '0.8rem', lineHeight: '1.5' }}
      />
      <label 
        htmlFor={id} 
        className={`absolute left-3 top-1 text-white text-sm transition-all duration-200 ${isFocused || value ? 'transform -translate-y-4 scale-100' : ''} ${errorMessage ? 'text-red-500' : ''}`}
        style={{
          backgroundColor: 'black',
          padding: '0 0.2rem',
        }}
      >
        {label}
      </label>
      {errorMessage && (
        <p className="text-red-500 text-sm mt-1 flex items-center">
          ❗{errorMessage}
        </p>
      )}
      {type === 'password' && (
        <button 
          type="button" 
          onClick={handleTogglePassword} 
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white focus:outline-none bg-transparent border-none p-0 hover: transition-opacity duration-200"

          aria-label="Toggle password visibility"
        >
          {showPassword ? (
              <svg
              width="23px"
              viewBox="0 0 64 64"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              role="img"
              className="iconify iconify--emojione-monotone"
              preserveAspectRatio="xMidYMid meet"
              
            >
              <path
                d="M32 12C12.123 12 2 32 2 32s10.123 20 30 20c19.879 0 30-20 30-20S51.879 12 32 12zm0 36.664C15.436 48.664 7 32 7 32s8.436-16.668 25-16.668C48.566 15.332 57 32 57 32s-8.434 16.664-25 16.664z"
                fill="#ffff"
              />
              <path
                d="M31.9 46.5c-7.995 0-14.5-6.505-14.5-14.5s6.505-14.5 14.5-14.5S46.4 24.005 46.4 32s-6.504 14.5-14.5 14.5m0-26c-6.341 0-11.5 5.159-11.5 11.5s5.159 11.5 11.5 11.5S43.4 38.341 43.4 32s-5.159-11.5-11.5-11.5"
                fill="#ffff"
              />
              <path
                d="M39.398 31.994c0 4.148-3.359 7.51-7.496 7.51a7.505 7.505 0 0 1-7.504-7.51c0-4.141 3.358-7.49 7.504-7.49c4.137 0 7.496 3.35 7.496 7.49"
                fill="#ffff"
              />
            </svg>
           
          ) : (
          
            <svg
            width="25px"
            viewBox="0 0 200 200"
            data-name="Layer 1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title />
            <path
              d="M177.5,67.4a9.75,9.75,0,0,0-14-1.5c-10.5,8.5-20,14.5-29.5,17.5-9.5,3.5-20.5,5-34,5s-24.5-1.5-34-5-19-9-29.5-17.5c-4.5-3.5-10.5-3-14,1.5s-3,10.5,1.5,14A132.06,132.06,0,0,0,45,95.9l-8.5,14.5c-2.5,5-1,11,3.5,13.5,5,2.5,11,1,13.5-3.5L63,103.9a112.84,112.84,0,0,0,27,4.5v18a10,10,0,0,0,20,0v-18a106.6,106.6,0,0,0,29-5.5l10,17.5a9.86,9.86,0,0,0,17-10l-9-15.5a111.22,111.22,0,0,0,19-13.5C180.5,77.9,181,71.9,177.5,67.4Z"
              fill="#ffff"
            />
          </svg>
          )}
        </button>
      )}
    </div>
  );
};

export default Input;
