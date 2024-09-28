import Footer from "../components/Footer";
import Nav from "../components/Nav";
import { Quote } from "../components/Quote";
import Button from "../components/Button";
import Input from "../components/Input";
import { Link } from "react-router-dom";
import {useState} from "react"



function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-screen bg-black text-white">
        <Nav />

        {/* Main Content Section */}
        <div className="flex flex-col lg:flex-row flex-grow items-center justify-center p-8 lg:p-16">
          
          {/* Quote Section */}
          <div className="flex lg:w-1/2 items-center justify-center mb-8 lg:mb-0">
            <Quote 
              initialMessage="Time is yours, and victory is within your grasp. Never stop running toward your dreams." 
              initialAuthor="Jai Krishna Sir"
              fontSize={24} 
            />
          </div>

          {/* Login Form Section */}
          <div className="flex lg:w-1/2 items-center justify-center"> 
            <form className="w-full max-w-sm bg-black text-white">
              <h2 className="text-3xl font-bold mb-6">Sign In</h2>
              <h3 className="text-lg font-bold mb-6">Don't have an account ?<Link className="ml-2 text-white underline hover:text-blue-200" to={"/signup"}>Sign up</Link></h3>
              <Input
                type="email"
                id="email"
                label="Email"
                onChange={(e) => setEmail(e.target.value)} 
                value={email}/>
              <Input
                type="password"
                id="password"
                label="Password"
                onChange={(e) => setPassword(e.target.value)} 
                value={password}/>
              <Button type="button" className="w-full">
                Sign In
              </Button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Signin;
