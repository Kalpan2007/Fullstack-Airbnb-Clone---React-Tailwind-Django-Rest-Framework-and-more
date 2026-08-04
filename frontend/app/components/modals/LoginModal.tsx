"use client";

import Modal from "./Modal";
import { useState } from "react";
import useLoginModal from "@/app/hooks/useLoginModal";
import CustomButton from "../forms/CustomButton";

const LoginModal = () => {
  const loginModal = useLoginModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const submitLogin = () => {
    console.log("clicked login", { email, password });
    setErrors([]);
    loginModal.close();
  };

  const content = (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <input
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your e-mail address"
        type="email"
        className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
      />

      <input
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Your password"
        type="password"
        className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
      />

      {errors.map((error, index) => (
        <div
          key={`error_${index}`}
          className="p-5 bg-airbnb text-white rounded-xl opacity-80"
        >
          {error}
        </div>
      ))}

      <CustomButton label="Submit" onClick={submitLogin} />
    </form>
  );

  return (
    <Modal
      isOpen={loginModal.isOpen}
      close={loginModal.close}
      label="Log in"
      content={content}
    />
  );
};

export default LoginModal;
