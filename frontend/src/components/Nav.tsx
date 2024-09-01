import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : 'auto'; // Disable scrolling when menu is open
  };

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 10);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        className={`fixed top-5 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-in-out rounded-lg border border-white p-3 ${
          isScrolled ? 'bg-black bg-opacity-50 text-white' : 'bg-black bg-opacity-40 text-white'
        } shadow-lg ${isOpen || isDropdownOpen ? 'h-auto' : 'h-14'}`}
        style={{ marginTop: '15px', width: '85%' }} // 85% width of the viewport
      >
        <div className="relative flex items-center justify-between mx-auto max-w-full">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold flex-shrink-0">
            ViewMyWay
          </Link>

          {/* Hamburger Menu for Mobile */}
          <button
            className="lg:hidden flex flex-col items-center justify-center p-2 focus:outline-none relative z-20"
            onClick={toggleMenu}
          >
            <div
              className={`w-6 h-0.5 bg-white transition-transform duration-300 ease-in-out ${
                isOpen ? 'rotate-45 translate-y-1.5' : ''
              }`}
            ></div>
            <div
              className={`w-6 h-0.5 bg-white transition-opacity duration-300 ease-in-out ${
                isOpen ? 'opacity-0' : 'opacity-100'
              }`}
            ></div>
            <div
              className={`w-6 h-0.5 bg-white transition-transform duration-300 ease-in-out ${
                isOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`}
            ></div>
          </button>

          {/* Nav Links */}
          <div
            className={`lg:flex lg:items-center lg:space-x-6 fixed lg:static top-0 right-0 transform ${
              isOpen ? 'translate-x-0' : 'translate-x-full'
            } transition-transform duration-500 ease-in-out bg-black lg:bg-transparent w-1/2 lg:w-auto h-screen lg:h-auto flex-col lg:flex-row items-start lg:items-center p-5 lg:p-0 z-10 ${
              isOpen || !isOpen && 'lg:visible lg:translate-x-0'
            }`}
          >
            <Link
              to="/"
              className="block text-lg font-medium hover:text-yellow-300 transition-colors duration-300 p-2 rounded"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/signin"
              className="block text-lg font-medium hover:text-yellow-300 transition-colors duration-300 p-2 rounded"
              onClick={() => setIsOpen(false)}
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="block text-lg font-medium hover:text-yellow-300 transition-colors duration-300 p-2 rounded"
              onClick={() => setIsOpen(false)}
            >
              Sign Up
            </Link>
            {/* Dropdown Menu */}
            <div
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button className="text-lg font-medium focus:outline-none pl-2">
                About
              </button>
              <div
                className={`absolute left-0 mt-2 w-full bg-black bg-opacity-70 text-white rounded-lg shadow-lg transition-all duration-300 ${
                  isDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
                style={{
                  top: '100%',
                  zIndex: '60',
                }}
              >
                <Link
                  to="/about"
                  className="block px-4 py-2 hover:bg-gray-800 transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  About Us
                </Link>
                <Link
                  to="/about/team"
                  className="block px-4 py-2 hover:bg-gray-800 transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  Team
                </Link>
                <Link
                  to="/about/careers"
                  className="block px-4 py-2 hover:bg-gray-800 transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  Careers
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay and Blur Effect when menu is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40 transition-all duration-300 ease-in-out"
          onClick={toggleMenu}
        />
      )}
    </>
  );
}

export default Nav;