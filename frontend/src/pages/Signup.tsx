import React, { useState } from "react";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import { Quote } from "../components/Quote";
import Button from "../components/Button";
import Input from "../components/Input";
import { Link } from "react-router-dom";
import { signupSchema } from "@phaneendra73/blog-common"; // Assuming this is a Zod schema
import axios from "axios";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confPassword, setConfPassword] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState<string>("");

  const validateInput = async (): Promise<boolean> => {
    const parsedBody = signupSchema.safeParse({ username, email, password, confPassword });
    if (!parsedBody.success) {
      const newErrors: { [key: string]: string } = {};
      parsedBody.error.errors.forEach(err => {
        newErrors[err.path[0] as string] = err.message;
      });
      setErrors(newErrors);
      return false;
    }
    setErrors({}); // Clear any previous errors
    return true;
  };

  const hitSignup = async (): Promise<void> => {
    const isValid = await validateInput();
    if (!isValid) return;

    if (password !== confPassword) {
      setErrors((prev) => ({ ...prev, confPassword: "Passwords do not match" }));
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8787/api/v1/user/signup", {
        username,
        email,
        password,
      });
      setSuccess(response.data.message);
      setErrors({}); // Clear any previous errors
    } catch (err: any) {
      setErrors({ api: err.response?.data?.message || "An error occurred. Please try again." });
      setSuccess(""); // Clear any previous success messages
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-screen bg-black text-white">
        <Nav />

        <div className="flex flex-col lg:flex-row flex-grow items-center justify-center p-8 lg:p-16">
          <div className="flex lg:w-1/2 items-center justify-center mb-8 lg:mb-0">
            <Quote 
              initialMessage="Every journey begins with a single step. Take that step today!" 
              initialAuthor="Anonymous"
              fontSize={24}
            />
          </div>

          <div className="flex lg:w-1/2 items-center justify-center">
            <form className="w-full max-w-sm bg-black text-white">
              <h2 className="text-3xl font-bold mb-6">Sign Up</h2>
              <h3 className="text-lg font-bold mb-6">
                Already have an account? 
                <Link className="ml-2 text-white underline hover:text-blue-200" to="/signin">Sign In</Link>
              </h3>

              <Input
                type="text"
                id="username"
                label="Username"
                onChange={(e) => setUsername(e.target.value)} 
                value={username}
                errorMessage={errors.username} // Pass the error message
              />
              
              <Input
                type="email"
                id="email"
                label="Email"
                onChange={(e) => setEmail(e.target.value)} 
                value={email}
                errorMessage={errors.email} // Pass the error message
              />
              
              <Input
                type="password"
                id="password"
                label="Password"
                onChange={(e) => setPassword(e.target.value)} 
                value={password}
                errorMessage={errors.password} // Pass the error message
              />
              
              <Input
                type="password"
                id="confirmPassword"
                label="Confirm Password"
                onChange={(e) => setConfPassword(e.target.value)} 
                value={confPassword}
                errorMessage={errors.confPassword} // Pass the error message
              />

              {errors.api && <p className="text-red-500 text-sm mt-1 mb-4 justify-center">{errors.api}</p>}

              <Button type="button" className="w-full" onClick={hitSignup}>
                Sign Up
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

export default SignUp;
