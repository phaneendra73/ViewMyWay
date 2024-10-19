import React, { useEffect } from 'react';

// Define the NotificationProps interface for type checking
interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'unauthorized';
  onClose: () => void;
  duration?: number;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  type,
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Call the onClose function after the duration
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const getMessageColor = () => {
    switch (type) {
      case 'success':
        return 'text-gray-800'; // Dark gray text for success
      case 'error':
        return 'text-black'; // Black text for error
      case 'unauthorized':
        return 'text-gray-600'; // Light gray text for unauthorized
      default:
        return 'text-white';
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ zIndex: 1000 }} // Ensuring the notification is above other elements
    >
      <div
        className={`bg-white rounded shadow-lg p-6 flex flex-col items-center border border-gray-300`}
      >
        {/* Using different SVG icons based on the type */}
        {type === 'success' ? (
          <svg
            fill="#4A4A4A"
            width="80px"
            height="80px"
            viewBox="0 -8 528 528"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>{"pass"}</title>
            <path d="M264 456Q210 456 164 429 118 402 91 356 64 310 64 256 64 202 91 156 118 110 164 83 210 56 264 56 318 56 364 83 410 110 437 156 464 202 464 256 464 310 437 356 410 402 364 429 318 456 264 456ZM368 192L332 160 231 282 178 229 146 261 235 350 368 192Z" />
          </svg>
        ) : type === 'unauthorized' ? (
          <svg
            fill="#4A4A4A"
            width="80px"
            height="80px"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M520.741 163.801a10.234 10.234 0 00-3.406-3.406c-4.827-2.946-11.129-1.421-14.075 3.406L80.258 856.874a10.236 10.236 0 00-1.499 5.335c0 5.655 4.585 10.24 10.24 10.24h846.004c1.882 0 3.728-.519 5.335-1.499 4.827-2.946 6.352-9.248 3.406-14.075L520.742 163.802zm43.703-26.674L987.446 830.2c17.678 28.964 8.528 66.774-20.436 84.452a61.445 61.445 0 01-32.008 8.996H88.998c-33.932 0-61.44-27.508-61.44-61.44a61.445 61.445 0 018.996-32.008l423.002-693.073c17.678-28.964 55.488-38.113 84.452-20.436a61.438 61.438 0 0120.436 20.436zM512 778.24c22.622 0 40.96-18.338 40.96-40.96s-18.338-40.96-40.96-40.96-40.96 18.338-40.96 40.96 18.338 40.96 40.96 40.96zm0-440.32c-22.622 0-40.96 18.338-40.96 40.96v225.28c0 22.622 18.338 40.96 40.96 40.96s40.96-18.338 40.96-40.96V378.88c0-22.622-18.338-40.96-40.96-40.96z" />
          </svg>
        ) : (
          <svg
            fill="#4A4A4A"
            width="80px"
            height="80px"
            viewBox="0 0 22 22"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.1458333,9.85416667 L12.1458333,6.74047388 C12.1458333,6.4826434 11.9382041,6.28571429 11.6820804,6.28571429 L10.3179196,6.28571429 C10.0656535,6.28571429 9.85416667,6.48931709 9.85416667,6.74047388 L9.85416667,9.85416667 L6.74047388,9.85416667 C6.4826434,9.85416667 6.28571429,10.0617959 6.28571429,10.3179196 L6.28571429,11.6820804 C6.28571429,11.9343465 6.48931709,12.1458333 6.74047388,12.1458333 L9.85416667,12.1458333 L9.85416667,15.2595261 C9.85416667,15.5173566 10.0617959,15.7142857 10.3179196,15.7142857 L11.6820804,15.7142857 C11.9343465,15.7142857 12.1458333,15.5106829 12.1458333,15.2595261 L12.1458333,12.1458333 L15.2595261,12.1458333 C15.5173566,12.1458333 15.7142857,11.9382041 15.7142857,11.6820804 L15.7142857,10.3179196 C15.7142857,10.0656535 15.5106829,9.85416667 15.2595261,9.85416667 L12.1458333,9.85416667 Z"
              id="Combined-Shape"
              transform="translate(11.000000, 11.000000) rotate(-45.000000) translate(-11.000000, -11.000000) "
            />
          </svg>
        )}
        <p className={`text-center font-bold ${getMessageColor()}`}>{message}</p>
      </div>
    </div>
  );
};

export default Notification;
