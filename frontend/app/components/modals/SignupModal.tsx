"use client";

import Modal from "./Modal";
import { useState } from "react";
import useSignupModal from "@/app/hooks/useSignupModal";
import CustomButton from "../forms/CustomButton";

const SignupModal = () => {
  const signupModal = useSignupModal();
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const submitSignup = () => {
    console.log("clicked signup", { email, password1, password2 });

    if (password1 !== password2) {
      setErrors(["Passwords do not match"]);
      return;
    }

    setErrors([]);
    signupModal.close();
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
        onChange={(e) => setPassword1(e.target.value)}
        placeholder="Your password"
        type="password"
        className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
      />

      <input
        onChange={(e) => setPassword2(e.target.value)}
        placeholder="Repeat password"
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

      <CustomButton label="Submit" onClick={submitSignup} />
    </form>
  );

  return (
    <Modal
      isOpen={signupModal.isOpen}
      close={signupModal.close}
      label="Sign up"
      content={content}
    />
  );
};

export default SignupModal;
