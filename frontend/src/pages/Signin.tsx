import Nav from "../components/Nav";
import { Quote } from "../components/Quote";

function Signin() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-black text-white">
      <Nav/>
      {/* Quote Section */}
      <div className="flex lg:w-1/2 h-1/3 lg:h-auto items-center justify-center p-8 lg:p-16">
        <Quote 
          message="Time is yours, and victory is within your grasp. Never stop running toward your dreams." 
          fontSize={24} // Slightly larger for readability
        />
      </div>

      {/* Login Form Section */}
      <div className="flex lg:w-1/2 h-2/3 lg:h-auto items-center justify-center p-8 lg:p-16">
        <form className="w-full max-w-sm bg-black text-white">
          <h2 className="text-3xl font-bold mb-6">Sign In</h2>
          <div className="mb-4">
            <label htmlFor="email" className="block text-white text-sm font-bold mb-2">Email</label>
            <input 
              type="email" 
              id="email" 
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-black text-white leading-tight focus:outline-none focus:shadow-outline" 
              placeholder="Email" 
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-white text-sm font-bold mb-2">Password</label>
            <input 
              type="password" 
              id="password" 
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-black text-white leading-tight focus:outline-none focus:shadow-outline" 
              placeholder="Password" 
            />
          </div>
          <button 
            type="submit" 
            className="bg-white text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-gray-200 transition duration-300 w-full"
          >
            Sign In
          </button>
        </form>
      </div>
     
    </div>
  );
}

export default Signin;
