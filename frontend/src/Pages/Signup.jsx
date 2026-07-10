import React, { useEffect, useRef, useState } from 'react';
import { Heading } from '../components/Heading';
import { Inputbox } from '../components/Inputbox';
import Button from '../components/Button';
import Bottomwarning from '../components/Bottomwarning';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToast } from '../hooks/use-toast';

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL?.replace(/\/api\/v1\/?$/, "") ||
  "http://localhost:4000";

const Signup = () => {
  let navigate = useNavigate();
  const { toast } = useToast()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState(null);
  const googleButtonRef = useRef(null);

  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId) return;

    const renderGoogleButton = () => {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: async ({ credential }) => {
          try {
            const response = await axios.post(`${API_BASE}/api/v1/auth/google`, { credential });
            localStorage.setItem("token", response.data.token);
            toast({ title: "Signed in with Google" });
            navigate('/');
          } catch (error) {
            toast({ title: "Google Sign-In failed", description: error.response?.data?.message || "Please try again.", variant: "destructive" });
          }
        },
      });
      window.google.accounts.id.renderButton(googleButtonRef.current, {
        theme: 'outline',
        size: 'large',
        width: 300,
        text: 'signup_with',
      });
    };

    const existingScript = document.getElementById('google-identity-service');
    if (existingScript) {
      existingScript.addEventListener('load', renderGoogleButton);
      if (window.google) renderGoogleButton();
      return () => existingScript.removeEventListener('load', renderGoogleButton);
    }
    const script = document.createElement('script');
    script.id = 'google-identity-service';
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.onload = renderGoogleButton;
    document.head.appendChild(script);
  }, [navigate, toast]);

  const handleSignup = async () => {
    try {
      const response = await axios.post(`${API_BASE}/api/v1/auth/signup`, {
        username,
        email,
        password,
        otp
      });
      if (response.data.success) {
        toast({ title: "Account created", description: "Please sign in." });
        navigate('/signin');
      }
    } catch (error) {
      toast({
        title: "Could not create account",
        description: error.response?.data?.message || "Please try again.",
        variant: "destructive",
      });
      console.error("Error signing up:", error);
    }
  };

  const HandleGetOtp = async () => {
    try {
      const response = await axios.post(`${API_BASE}/api/v1/auth/sendotp`, {
        email,
      });
      if (response.data.success) {
        console.log(response.data);
        toast({ title: "OTP sent", description: "Check your email inbox and spam folder." })
      }
    } catch (error) {
      toast({
        title: "Could not send OTP",
        description: error.response?.data?.error || error.response?.data?.message || "Please try again.",
        variant: "destructive",
      });
      console.error("Error sending OTP:", error);
    }
  }

  return (
    <div className='flex min-h-screen w-full items-center py-10 lg:h-screen lg:py-0'>
      <div className='flex w-full flex-col items-center gap-10 px-5 lg:h-full lg:flex-row lg:gap-0 lg:px-0'>
        <div className='flex w-full flex-col items-center text-center lg:w-[40%] lg:text-left'>
          <Heading label={"Sign Up"}></Heading>
          <div className='max-w-md lg:w-[60%] lg:max-w-none'>
            <p>Sign up through you account to continue with membership purchase or manage your account and preferences.</p>
          </div>
        </div>
        <div className='flex w-full max-w-xl flex-col gap-1 lg:w-[50%] lg:max-w-none'>
          <Inputbox
            onChange={(e) => setUsername(e.target.value)}
            placeholder={"Enter your Name"}
            label={"Name*"}
          ></Inputbox>
          <div className='relative '>
            <Inputbox
              onChange={(e) => setEmail(e.target.value)}
              placeholder={"Enter your Email"}
              label={"Email*"}
            ></Inputbox>
            <button className='absolute right-0 top-[42px] rounded-sm bg-black p-2 text-sm text-white sm:text-base' onClick={HandleGetOtp}>Get Otp</button>
          </div>

          <Inputbox
            onChange={(e) => setPassword(e.target.value)}
            placeholder={"Enter your Password"}
            label={"Password*"}
          ></Inputbox>

          <Inputbox
            onChange={(e) => setOtp(e.target.value)}
            placeholder={"Enter your Otp"}
            label={"Otp*"}
          ></Inputbox>

          <div className='pt-4'>
            <Button
              onClick={handleSignup}
              label={"Sign Up"}></Button>
            {import.meta.env.VITE_GOOGLE_CLIENT_ID ? (
              <div ref={googleButtonRef} className='mb-2 flex justify-center'></div>
            ) : (
              <Button
                label={"Sign up With Google"}
                onClick={() => toast({ title: "Google Sign-In is not configured", description: "Add VITE_GOOGLE_CLIENT_ID in Vercel and GOOGLE_CLIENT_ID in Render.", variant: "destructive" })}
              ></Button>
            )}
            <Bottomwarning label={"Already have an account?"} buttontext={"Sign In"} to={"/signin"}></Bottomwarning>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
