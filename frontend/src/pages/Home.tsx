import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Button from "../components/Button";
import "../index.css";
import TestSignInButton from "../components/TestSigninButton";

function Home() {
  return (
    <div className="relative flex flex-col min-h-screen bg-black text-white overflow-hidden">
      {/* Background Stars */}
      <div className="absolute inset-0 flex flex-wrap pointer-events-none">
        {Array.from({ length: 30 }).map((_, index) => {
          const moveX = `${Math.random() * 100 - 50}vw`; // Random horizontal movement
          const moveY = `${Math.random() * 100 - 50}vh`; // Random vertical movement
          const duration = 13 + Math.random() * 3; // Random duration between 3s and 6s

          return (
            <div
              key={index}
              className="star opacity-75 animate-sparkle"
              style={{
                width: `13px`,
                height: `13px`,
                top: `${Math.random() * 100}vh`,
                left: `${Math.random() * 100}vw`,
                animation: `moveRandom ${duration}s linear infinite`,
                '--move-x': moveX,
                '--move-y': moveY,
              } as React.CSSProperties}
            />
          );
        })}
      </div>

      {/* Content Section */}
      <div className="flex-grow flex items-center justify-center p-8 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to View My Way</h1>
          <p className="mb-8 w-[70%] mx-auto">
            Explore a vibrant community of thinkers and creators on "View My Way."
            Join us for insightful articles, inspiring stories, and a space to share your own voice.
            Let your creativity shine and connect with others who share your passion!
          </p>

          <div>
            <Button to="/signup" className="mr-4">
              Sign Up
            </Button>
            <Button to="/signin">
              Login
            </Button>
            <TestSignInButton ></TestSignInButton>
          </div>
        </div>
      </div>

      <Nav />
      <Footer />
    </div>
  );
}

export default Home;
