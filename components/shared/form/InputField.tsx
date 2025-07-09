import React from "react";

interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  touched?: boolean;
  icon?: React.ReactNode;
  autoComplete?: string;
  children?: React.ReactNode; // for password toggle button
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  touched,
  icon,
  autoComplete,
  children,
}) => {
  return (
    <label htmlFor={name} aria-hidden>
      <div className="w-fit text-sm px-1 text-gray-600 relative z-10 bg-[#f2f4f7] ml-2 -mb-2">
        {label}
      </div>
      <div className="relative">
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`placeholder:text-sm ${type === "password" ? "placeholder:underline" : ""} ${icon ? "indent-8" : "indent-2.5"} w-full ring ring-gray-600 rounded-md py-3 px-3 outline-none focus:ring-2 focus:ring-primary ${
            error && touched ? "ring-red-500" : ""
          }`}
          autoComplete={autoComplete}
        />
        {icon && (
          <span className="absolute text-2xl top-1/2 left-3 transform -translate-y-1/2 text-gray-500">
            {icon}
          </span>
        )}
        {children}
      </div>
      {error && touched && (
        <div className="text-xs text-red-600 mt-1 ml-2">{error}</div>
      )}
    </label>
  );
};

export default InputField;
