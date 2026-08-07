"use client";

import Modal from "./Modal";
import { useState } from "react";
import useSignupModal from "@/app/hooks/useSignupModal";
import CustomButton from "../forms/CustomButton";
import apiService from "@/app/services/apiService";
import { handleLogin } from "@/app/lib/actions";

const SignupModal = () => {
  const signupModal = useSignupModal();
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const submitSignup = async () => {
    console.log("clicked signup", { email, password1, password2 });

    if (password1 !== password2) {
      setErrors(["Passwords do not match"]);
      return;
    }

    const formData = {
      email: email,
      password1: password1,
      password2: password2,
    };

    const response = await apiService.postWithoutToken(
      "/api/register/",
      JSON.stringify(formData)
    );

    console.log("Signup response:", response);

    if (response.access) {
      await handleLogin(response.user.pk, response.access, response.refresh);
      setErrors([]);
      signupModal.close();
      window.location.reload();
    } else {
      const errorMessages: string[] = [];
      if (response.non_field_errors) {
        errorMessages.push(...response.non_field_errors);
      }
      Object.keys(response).forEach((key) => {
        if (key !== "non_field_errors") {
          const fieldErrors = response[key];
          if (Array.isArray(fieldErrors)) {
            fieldErrors.forEach((err: string) => {
              errorMessages.push(`${key}: ${err}`);
            });
          }
        }
      });
      setErrors(errorMessages);
    }
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
