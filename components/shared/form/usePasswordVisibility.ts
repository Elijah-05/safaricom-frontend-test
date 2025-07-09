import { useState, useCallback } from "react";

export default function usePasswordVisibility(): [boolean, () => void] {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);
  return [showPassword, toggleShowPassword];
}
