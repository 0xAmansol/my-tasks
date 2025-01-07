"use client";

import { auth, provider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import React from "react";
import InteractiveHoverButton from "./ui/interactive-hover-button";

const Login = () => {
  const router = useRouter();
  const handleLogin = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      console.log("user info:", res.user);
      if (res.user) {
        console.log("Login successful");
        router.push("/dashboard");
      }
    } catch (error) {
      console.log("error:", error);
    }
  };
  return (
    <div>
      <InteractiveHoverButton onClick={handleLogin}>
        Login with Google
      </InteractiveHoverButton>
    </div>
  );
};

export default Login;
