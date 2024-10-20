import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "./Card";

function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  //const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const [isHomeExpanded, setIsHomeExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("ViewMyWay"));

  const aboutButtonRef = useRef<HTMLDivElement | null>(null);
  const aboutDropdownRef = useRef<HTMLDivElement | null>(null);
  const homeButtonRef = useRef<HTMLDivElement | null>(null);
  const homeDropdownRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();

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
        // setIsAboutExpanded(false);
        setIsHomeExpanded(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // const handleMouseEnterAbout = () => {
  //   setIsAboutExpanded(true);
  // };

  // const handleMouseLeaveAbout = () => {
  //   setTimeout(() => {
  //     if (
  //       aboutButtonRef.current &&
  //       aboutDropdownRef.current &&
  //       !aboutButtonRef.current.matches(":hover") &&
  //       !aboutDropdownRef.current.matches(":hover")
  //     ) {
  //       setIsAboutExpanded(false);
  //     }
  //   }, 100);
  // };

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

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("ViewMyWay"); // Remove the token or user info
    setIsAuthenticated(false); // Update the authentication state
    navigate('/'); // Redirect to the home page
  };

  const renderMobileNavbar = () => (
    <div className={`fixed top-0 left-0 w-full z-50 bg-transparent text-white`}>
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
        className={`transition-all duration-500 ease-in-out transform ${isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden bg-black text-white w-full`}
        style={{ transitionProperty: "max-height, opacity" }}
      >
        <div className={`flex flex-col items-center justify-center space-y-6 h-screen p-6`}>
          <Link to="/" className="hover:text-gray-300 text-lg">
            Posts
          </Link>
          {isAuthenticated ? (
            <button onClick={handleLogout} className="hover:text-gray-300 hover:border text-lg">
              Logout
            </button>
          ) : (
            <>
              <Link to="/signup" className="hover:text-gray-300 text-lg">
                Sign Up
              </Link>
              <Link to="/signin" className="hover:text-gray-300 text-lg">
                Sign In
              </Link>
            </>
          )}
          <Link to="/about" className="hover:text-gray-300 text-lg">
            About
          </Link>
        </div>
      </div>
    </div>
  );

  const renderDesktopNavbar = () => (
    <div className="relative">
      <div
        className={`fixed top-5 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-in-out rounded-lg border border-white ${isScrolled
          ? "bg-black bg-opacity-80 text-white shadow-lg"
          : "bg-black bg-opacity-60 text-white shadow-md"
          }`}
        //style={{ width: "73%", height: isAboutExpanded || isHomeExpanded ? "auto" : "40px", transition: "height 0.3s ease" }}
        style={{ width: "73%", height: isHomeExpanded ? "auto" : "40px", transition: "height 0.3s ease" }}
      >
        <div className="flex items-center justify-between" style={{ padding: "0 10px" }}>
          <Link
            to="/"
            className="text-lg font-extrabold text-white hover:text-gray-300 transition-colors duration-300"
            style={{ padding: "4px 0" }}
          >
            ViewMyWay
          </Link>
          <div className="flex items-center space-x-4">
            <div
              className="relative"
              ref={homeButtonRef}
              onMouseEnter={handleMouseEnterHome}
              onMouseLeave={handleMouseLeaveHome}
            >
              <button
                className="text-md font-semibold text-white hover:bg-transparent hover:text-gray-300 transition-colors duration-300"

                onClick={() => setIsHomeExpanded(!isHomeExpanded)}
                style={{ padding: "2px 0" }}
              >
                Posts
              </button>
            </div>
            {/* <div
              className="relative"
              ref={aboutButtonRef}
              onMouseEnter={handleMouseEnterAbout}
              onMouseLeave={handleMouseLeaveAbout}
            >
              <button
                className="text-md font-semibold text-white hover:bg-transparent hover:text-gray-300 transition-colors duration-300"
                onClick={() => setIsAboutExpanded(!isAboutExpanded)}
                style={{ padding: "2px 0" }}
              >
                Create Post
              </button>
            </div> */}

            {/* Conditional Rendering for Logout/Sign In/Sign Up */}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="text-sm font-semibold text-white bg-slate-900 border border-gray-300 py-0.5 px-1 rounded-lg hover:bg-zinc-500 transition duration-300"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/signup">
                  <button className="text-sm font-semibold text-gray-900 bg-white border border-gray-300 py-0.5 px-1 rounded-lg hover:bg-gray-100 transition duration-300">
                    Sign Up
                  </button>
                </Link>
                <Link to="/signin">
                  <button className="text-sm font-semibold text-white bg-slate-900 border border-gray-300 py-0.5 px-1 rounded-lg hover:bg-zinc-500 transition duration-300">
                    Login
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* About Dropdown
        <div
          className={`transition-all duration-700 ease-out overflow-hidden bg-black bg-opacity-90 text-black rounded-lg shadow-lg mt-2 ${isAboutExpanded ? "max-h-[500px] opacity-100 translate-y-0" : "max-h-0 opacity-0 translate-y-4"
            }`}
          ref={aboutDropdownRef}
          onMouseEnter={handleMouseEnterAbout}
          onMouseLeave={handleMouseLeaveAbout}
        >
          <div className="grid grid-cols-4  grid-rows-1 gap-4 p-6">
            <Card title="Vertical Card 1" description="Description of Vertical Card 1" link="/vertical-card-1" className="col-span-2 row-span-4" />
            <Card title="Vertical Card 2" description="Description of Vertical Card 2" link="/vertical-card-2" />
            <Card title="Card 1" description="Description of Card 1" link="/card-1" />
            <Card title="Card 2" description="Description of Card 2" link="/card-2" />
            <Card title="Card 3" description="Description of Card 3" link="/card-3" />
          </div>
        </div> */}

        {/* Posts Dropdown */}
        <div
          className={`transition-all duration-700 ease-out overflow-hidden bg-black bg-opacity-90 text-white rounded-lg shadow-lg mt-2 ${isHomeExpanded ? "max-h-[500px] opacity-100 translate-y-0" : "max-h-0 opacity-0 translate-y-4"
            }`}
          ref={homeDropdownRef}
          onMouseEnter={handleMouseEnterHome}
          onMouseLeave={handleMouseLeaveHome}
        >
          <div className="grid grid-cols-2 ">
            {/* Tall Card */}
            <Card
              title="Read Posts"
              description="Explore various posts and articles."
              link="/posts"
              className="col-span-2 row-span-2 h-42" // Spans across both columns and taller
            />
            {/* Medium Card */}
            <Card
              title="Create Posts"
              description="Share your thoughts and insights."
              link="/create"
              className="col-span-1 row-span-1 h-32" // Shorter card
            />
            {/* Small Card */}
            <Card
              title="About"
              description="Learn more about this blog."
              link="/about"
              className="col-span-1 row-span-1 h-32" // Shorter card
            />
            {/* Tall Card */}
            <Card
              title="My Posts"
              description="Manage and edit your existing posts."
              link="/my-posts"
              className="col-span-2 row-span-1 h-48" // Spans across both columns but shorter
            />
          </div>

        </div>
      </div>
    </div>
  );

  return <>{windowWidth < 1026 ? renderMobileNavbar() : renderDesktopNavbar()}</>;
}

export default Nav;
