import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const [isHomeExpanded, setIsHomeExpanded] = useState(false); // For Home dropdown
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // For mobile menu
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // Track window width

  const aboutButtonRef = useRef<HTMLDivElement | null>(null);
  const aboutDropdownRef = useRef<HTMLDivElement | null>(null);
  const homeButtonRef = useRef<HTMLDivElement | null>(null);
  const homeDropdownRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 10);
  };

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        aboutButtonRef.current &&
        !aboutButtonRef.current.contains(event.target as Node) &&
        aboutDropdownRef.current &&
        !aboutDropdownRef.current.contains(event.target as Node) &&
        homeButtonRef.current &&
        !homeButtonRef.current.contains(event.target as Node) &&
        homeDropdownRef.current &&
        !homeDropdownRef.current.contains(event.target as Node)
      ) {
        setIsAboutExpanded(false);
        setIsHomeExpanded(false); // Close Home dropdown
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMouseEnterAbout = () => {
    setIsAboutExpanded(true);
  };

  const handleMouseLeaveAbout = () => {
    setTimeout(() => {
      if (
        aboutButtonRef.current &&
        aboutDropdownRef.current &&
        !aboutButtonRef.current.matches(":hover") &&
        !aboutDropdownRef.current.matches(":hover")
      ) {
        setIsAboutExpanded(false);
      }
    }, 100);
  };

  const handleMouseEnterHome = () => {
    setIsHomeExpanded(true);
  };

  const handleMouseLeaveHome = () => {
    setTimeout(() => {
      if (
        homeButtonRef.current &&
        homeDropdownRef.current &&
        !homeButtonRef.current.matches(":hover") &&
        !homeDropdownRef.current.matches(":hover")
      ) {
        setIsHomeExpanded(false);
      }
    }, 100);
  };

  // Toggle mobile menu
  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Render Mobile Navbar
  const renderMobileNavbar = () => (
    <div className={`fixed top-0 left-0 w-full z-50 bg-black text-white`}>
      <div className="flex items-center justify-between p-4">
        <Link to="/" className="text-xl font-bold">
          ViewMyWay
        </Link>
        <button
          onClick={handleMobileMenuToggle}
          className="text-xl focus:outline-none"
        >
          {isMobileMenuOpen ? "✖" : "☰"}
        </button>
      </div>
      <div
        className={`transition-all duration-500 ease-in-out transform ${
          isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden bg-black bg-opacity-90 text-white w-full`}
        style={{ transitionProperty: "max-height, opacity" }}
      >
        <div className="flex flex-col items-center justify-center space-y-6 h-full p-6">
          <Link to="/" className="hover:text-gray-300 text-lg">
            Home
          </Link>
          <Link to="/signin" className="hover:text-gray-300 text-lg">
            Sign In
          </Link>
          <Link to="/about" className="hover:text-gray-300 text-lg">
            About
          </Link>
        </div>
      </div>
    </div>
  );

  // // Render Desktop Navbar
  const renderDesktopNavbar = () => (
    <div className="relative">
      <div
        className={`fixed top-5 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-in-out rounded-lg border border-white ${
          isScrolled
            ? "bg-black bg-opacity-80 text-white shadow-lg"
            : "bg-black bg-opacity-60 text-white shadow-md"
        }`}
        style={{ width: "73%", height: isAboutExpanded || isHomeExpanded ? "auto" : "40px", transition: "height 0.3s ease" }} // Dynamic height based on dropdown state


      >
        <div
          className="flex items-center justify-between"
          style={{ padding: "0 10px" }}
        >
          {" "}
          {/* Further reduced padding */}
          <Link
            to="/"
            className="text-lg font-extrabold text-white hover:text-gray-300 transition-colors duration-300"
            style={{ padding: "4px 0" }} // Reduced padding for title
          >
            ViewMyWay
          </Link>
          <div className="flex items-center space-x-4">
            {" "}
            {/* Reduced spacing between elements */}
            {/* Home Dropdown */}
            <div
              className="relative"
              ref={homeButtonRef}
              onMouseEnter={handleMouseEnterHome}
              onMouseLeave={handleMouseLeaveHome}
            >
              <button
                className="text-md font-semibold text-gray-200 hover:text-white transition-colors duration-300 focus:outline-none"
                onClick={() => setIsHomeExpanded(!isHomeExpanded)}
                style={{ padding: "2px 0" }} // Further reduced padding for buttons
              >
                Home
              </button>
            </div>
            {/* Sign In Link */}
            <Link
              to="/signin"
              className="text-md font-semibold text-white hover:text-gray-300 transition-colors duration-300"
              style={{ padding: "2px 0" }} // Further reduced padding
            >
              Sign In
            </Link>
            {/* About Dropdown */}
            <div
              className="relative"
              ref={aboutButtonRef}
              onMouseEnter={handleMouseEnterAbout}
              onMouseLeave={handleMouseLeaveAbout}
            >
              <button
                className="text-md font-semibold text-gray-200 hover:text-white transition-colors duration-300 focus:outline-none"
                onClick={() => setIsAboutExpanded(!isAboutExpanded)}
                style={{ padding: "2px 0" }} // Further reduced padding for About button
              >
                About
              </button>
            </div>
          </div>
        </div>

        {/* About Dropdown */}

        <div
          className={`transition-all duration-500 ease-out overflow-hidden bg-black bg-opacity-90 text-white rounded-lg shadow-lg mt-2 ${
            isAboutExpanded
              ? "max-h-[500px] opacity-100 translate-y-0"
              : "max-h-0 opacity-0 translate-y-4"
          }`}
          ref={aboutDropdownRef}
          onMouseEnter={handleMouseEnterAbout}
          onMouseLeave={handleMouseLeaveAbout}
        >
          <div className="grid grid-cols-3 gap-4 p-6">
            <div className="bg-gray-800 rounded-lg shadow-md p-4 hover:bg-gray-700">
              <h3 className="text-lg font-semibold text-white">
                Full-width Card
              </h3>

              <p className="text-sm text-gray-400">
                Description of Full-width Card
              </p>

              <Link
                to="/full-width-card"
                className="mt-3 inline-block px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
              >
                Visit
              </Link>
            </div>

            <div className="col-span-2 row-span-2 bg-gray-800 rounded-lg shadow-md p-4 hover:bg-gray-700">
              <h3 className="text-lg font-semibold text-white">
                Vertical Card 1
              </h3>

              <p className="text-sm text-gray-400">
                Description of Vertical Card 1
              </p>

              <Link
                to="/vertical-card-1"
                className="mt-3 inline-block px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
              >
                Visit
              </Link>
            </div>

            <div className="col-span-2 row-span-2 bg-gray-800 rounded-lg shadow-md p-4 hover:bg-gray-700">
              <h3 className="text-lg font-semibold text-white">
                Vertical Card 2
              </h3>

              <p className="text-sm text-gray-400">
                Description of Vertical Card 2
              </p>

              <Link
                to="/vertical-card-2"
                className="mt-3 inline-block px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
              >
                Visit
              </Link>
            </div>

            <div className="bg-gray-800 rounded-lg shadow-md p-4 hover:bg-gray-700">
              <h3 className="text-lg font-semibold text-white">Card 1</h3>

              <p className="text-sm text-gray-400">Description of Card 1</p>
            </div>

            <div className="bg-gray-800 rounded-lg shadow-md p-4 hover:bg-gray-700">
              <h3 className="text-lg font-semibold text-white">Card 2</h3>

              <p className="text-sm text-gray-400">Description of Card 2</p>
            </div>

            <div className="bg-gray-800 rounded-lg shadow-md p-4 hover:bg-gray-700">
              <h3 className="text-lg font-semibold text-white">Card 3</h3>

              <p className="text-sm text-gray-400">Description of Card 3</p>
            </div>
          </div>
        </div>

        {/* Home Dropdown */}

        <div
          className={`transition-all duration-500 ease-out overflow-hidden bg-black bg-opacity-90 text-white rounded-lg shadow-lg mt-2 ${
            isHomeExpanded
              ? "max-h-[500px] opacity-100 translate-y-0"
              : "max-h-0 opacity-0 translate-y-4"
          }`}
          ref={homeDropdownRef}
          onMouseEnter={handleMouseEnterHome}
          onMouseLeave={handleMouseLeaveHome}
        >
          <div className="grid grid-cols-3 gap-4 p-6">
            {/* Example Content for Home Dropdown */}

            <div className="bg-gray-800 rounded-lg shadow-md p-4 hover:bg-gray-700">
              <h3 className="text-lg font-semibold text-white">
                Home Section 1
              </h3>

              <p className="text-sm text-gray-400">
                Description of Home Section 1
              </p>

              <Link
                to="/home-section-1"
                className="mt-3 inline-block px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
              >
                Visit
              </Link>
            </div>

            <div className="bg-gray-800 rounded-lg shadow-md p-4 hover:bg-gray-700">
              <h3 className="text-lg font-semibold text-white">
                Home Section 2
              </h3>

              <p className="text-sm text-gray-400">
                Description of Home Section 2
              </p>

              <Link
                to="/home-section-2"
                className="mt-3 inline-block px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
              >
                Visit
              </Link>
            </div>

            <div className="bg-gray-800 rounded-lg shadow-md p-4 hover:bg-gray-700">
              <h3 className="text-lg font-semibold text-white">
                Home Section 3
              </h3>

              <p className="text-sm text-gray-400">
                Description of Home Section 3
              </p>

              <Link
                to="/home-section-3"
                className="mt-3 inline-block px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
              >
                Visit
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>{windowWidth < 1026 ? renderMobileNavbar() : renderDesktopNavbar()}</>
  );
}

export default Nav;
