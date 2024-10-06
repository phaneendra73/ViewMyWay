import Giticon from "./Giticon";
import InIcon from "./InIcon";
import TwitterIcon from "./TwitterIcon";

function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4 flex flex-col items-center">
        
        {/* Line above Social Media Links */}
        <div className="border-t border-stone-900 w-full mb-4" />

        {/* Social Media Links */}
        <div className="flex justify-center items-center space-x-6 mb-4">
          <a href="https://in.linkedin.com/in/phaneendra73" target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 hover:scale-110">
            <InIcon />
          </a>
          <a href="https://twitter.com/phaneendra73_" target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 hover:scale-110">
            <TwitterIcon />
          </a>
          <a href="https://github.com/phaneendra73" target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 hover:scale-110">
            <Giticon />
          </a>
        </div>

        {/* Bottom Footer Text */}
        <div className="text-center mt-4">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} ViewMyWay. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
