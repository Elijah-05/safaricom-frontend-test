import React from "react";

interface ToastProps {
  message: string;
  visible: boolean;
}

const Toast: React.FC<ToastProps> = ({ message, visible }) =>
  visible ? (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-primary text-white px-6 py-3 rounded shadow-lg z-50 transition-all">
      {message}
    </div>
  ) : null;

export default Toast;
