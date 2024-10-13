import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import { Quote } from "../components/Quote";
import Button from "../components/Button";
import Input from "../components/Input";
import { Link } from "react-router-dom";
import { SigninInput, signinSchema } from "@phaneendra73/blog-common"; // Assuming this is a Zod schema
import axios from "axios";
import { BACKEND_URL } from "../config";

const SignIn: React.FC = () => {
  const navigate = useNavigate(); // Add useNavigate for redirection
  const [postsignin, setPostSignin] = useState<SigninInput>({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState<string>("");

  const validateInput = async (): Promise<boolean> => {
    const parsedBody = signinSchema.safeParse(postsignin);
    if (!parsedBody.success) {
      const newErrors: { [key: string]: string } = {};
      parsedBody.error.errors.forEach(err => {
        newErrors[err.path[0] as string] = err.message;
      });
      setErrors(newErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const hitSignIn = async (): Promise<void> => {
    const isValid = await validateInput();
    if (!isValid) return;

    try {
      const response = await axios.post(`${BACKEND_URL}/user/signin`, postsignin);

      // Store JWT in local storage
      localStorage.setItem("ViewMyWay", response.data.jwt);

      setSuccess("Login successful! Redirecting...");
      setErrors({}); // Clear any previous errors

      // Navigate to the desired page (e.g., dashboard)
      setTimeout(() => {
        navigate("/Edit"); // Change this to your desired route
      }, 2000); // Optional: add a delay before navigating
    } catch (err: any) {
      if (err.response && err.response.data) {
        const { error } = err.response.data;
        console.log(error);
        setErrors({api:error}); // Set the new errors
        setSuccess(""); // Clear any previous success messages
      } else {
        setErrors({ api: "An error occurred. Please try again." });
        setSuccess(""); // Clear any previous success messages
      }
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-screen bg-black text-white">
        <Nav />

        <div className="flex flex-col lg:flex-row flex-grow items-center justify-center p-8 lg:p-16">
          <div className="flex lg:w-1/2 items-center justify-center mb-8 lg:mb-0">
            <Quote 
              initialMessage="Welcome back! Let's get you logged in." 
              initialAuthor="Anonymous"
              fontSize={24}
            />
          </div>

          <div className="flex lg:w-1/2 items-center justify-center">
            <form className="w-full max-w-sm bg-black text-white">
              <h2 className="text-3xl font-bold mb-6">Sign In</h2>
              <h3 className="text-lg font-bold mb-6">
                Don't have an account? 
                <Link className="ml-2 text-white underline hover:text-blue-200" to="/signup">Sign Up</Link>
              </h3>

              <Input
                type="email"
                id="email"
                label="Email"
                onChange={(e) => setPostSignin({ ...postsignin, email: e.target.value })}
                value={postsignin.email}
                errorMessage={errors.email} // Pass the error message
              />

              <Input
                type="password"
                id="password"
                label="Password"
                onChange={(e) => setPostSignin({ ...postsignin, password: e.target.value })}
                value={postsignin.password}
                errorMessage={errors.password} // Pass the error message
              />

              {errors.api && <p className="text-red-500 text-sm mt-1 mb-4">{errors.api}</p>}

              <Button type="button" className="w-full" onClick={hitSignIn}>
                Sign In
              </Button>

              {success && <p className="text-green-500 mt-4">{success}</p>}
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SignIn;
