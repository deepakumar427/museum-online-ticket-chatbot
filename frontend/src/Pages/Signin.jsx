import React, { useState } from "react";
import { Heading } from "../components/Heading";
import { Inputbox } from "../components/Inputbox";
import Button from "../components/Button";
import Bottomwarning from "../components/Bottomwarning";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Assuming you are using react-router
import { useToast } from "../hooks/use-toast";
import { ArrowLeft } from "lucide-react";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL?.replace(/\/api\/v1\/?$/, "") ||
  "http://localhost:4000";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // For redirection
  const { toast } = useToast();

  const handleSignIn = async () => {
    try {
      const response = await axios.post(`${API_BASE}/api/v1/auth/login`, {
        email,
        password,
      });
      console.log(response.data);
      localStorage.setItem("token", response.data.token); 

      navigate("/");
    } catch (error) {
      toast({
        title: "Sign in failed",
        description: error.response?.data?.message || "Please check your connection and try again.",
        variant: "destructive",
      });
      console.error("Sign in failed", error);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center py-10 lg:h-screen lg:py-0">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="absolute left-6 top-6 flex cursor-pointer items-center gap-2 text-gray-500 transition-colors hover:text-gray-900"
      >
        <ArrowLeft size={18} />
        Back
      </button>
      <div className="flex w-full flex-col items-center gap-10 px-5 lg:h-full lg:flex-row lg:gap-0 lg:px-0">
        <div className="flex w-full flex-col items-center text-center lg:w-[40%] lg:text-left">
          <Heading label={"Sign In"}></Heading>
          <div className="max-w-md lg:w-[60%] lg:max-w-none">
            <p>
              Log in to your account to continue with membership purchase or manage your account and preferences.
            </p>
          </div>
        </div>
        <div className="w-full max-w-xl lg:w-[50%] lg:max-w-none">
          <Inputbox
            onChange={(e) => setEmail(e.target.value)}
            placeholder={"Enter your Email"}
            label={"Email*"}
          ></Inputbox>
          
          <Inputbox
            onChange={(e) => setPassword(e.target.value)}
            placeholder={"Enter your Password"}
            label={"Password*"}
            type="password" // Add type="password" for password field
          ></Inputbox>

          <div className="pt-4">
            <Button label={"Sign In"} onClick={handleSignIn}></Button>
            <Bottomwarning label={"Don't have an account?"} buttontext={"Sign Up"} to={"/signup"}></Bottomwarning>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
