"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import InputField from "./InputField";
import usePasswordVisibility from "./usePasswordVisibility";

interface FormStateProp {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [showPassword, toggleShowPassword] = usePasswordVisibility();
  const [formState, setFormState] = useState<FormStateProp>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [touched, setTouched] = useState<{ email: boolean; password: boolean }>(
    { email: false, password: false }
  );
  const router = useRouter();

  // Email validation (simple regex)
  const validateEmail = (email: string) => {
    if (!email) return "Email is required.";
    // Simple email regex
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) return "Please enter a valid email address.";
    return "";
  };

  // Password validation
  const validatePassword = (password: string) => {
    if (!password) return "Password is required.";
    if (password.length < 8) return "Password must be at least 8 characters.";
    if (!/[A-Z]/.test(password))
      return "Password must contain at least one uppercase letter.";
    if (!/[a-z]/.test(password))
      return "Password must contain at least one lowercase letter.";
    if (!/[0-9]/.test(password))
      return "Password must contain at least one number.";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
      return "Password must contain at least one special character.";
    return "";
  };

  // Validate all fields
  const validate = (state: FormStateProp) => {
    return {
      email: validateEmail(state.email),
      password: validatePassword(state.password),
    };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldErrors = validate(formState);
    setErrors((prev) => ({
      ...prev,
      [name]: fieldErrors[name as keyof FormStateProp],
    }));
  };

  const isFormValid = () => {
    const fieldErrors = validate(formState);
    return !fieldErrors.email && !fieldErrors.password;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fieldErrors = validate(formState);
    setErrors(fieldErrors);
    setTouched({ email: true, password: true });
    if (!fieldErrors.email && !fieldErrors.password) {
      // Simulate login success and redirect
      router.push("/dashboard");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
      <div>
        <InputField
          label="Email Address"
          name="email"
          type="email"
          value={formState.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your email address"
          error={errors.email}
          touched={touched.email}
          icon={<MdOutlineEmail />}
          autoComplete="username"
        />
      </div>
      <div>
        <InputField
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formState.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="****"
          error={errors.password}
          touched={touched.password}
          icon={null}
          autoComplete="current-password"
        >
          {formState.password.trim().length > 0 && (
            <button
              type="button"
              onClick={toggleShowPassword}
              aria-hidden
              tabIndex={-1}
            >
              {showPassword ? (
                <FaRegEyeSlash className="absolute text-xl top-1/2 right-3 transform -translate-y-1/2 text-gray-500" />
              ) : (
                <FaRegEye className="absolute text-xl top-1/2 right-3 transform -translate-y-1/2 text-gray-500" />
              )}
            </button>
          )}
        </InputField>
      </div>
      <button
        type="submit"
        className="mt-3 w-full text-sm md:text-base p-3 uppercase bg-primary hover:bg-primary/80 text-white font-semibold rounded-md drop-shadow-lg duration-500 disabled:opacity-60 disabled:cursor-not-allowed"
        disabled={!isFormValid()}
      >
        Login
      </button>
      <div className="flex justify-end text-sm text-primary">
        Forgot password?
      </div>
    </form>
  );
}
