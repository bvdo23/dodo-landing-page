import React from "react";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  styleType?: "default" | "neon" | "danger" | "info" | "success";
  buttonType?: "default" | "outline";
  minWidth?: "full" | "fit";
  size?: "large" | "middle" | "small";
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  disabled = false,
  className = "",
  styleType = "default",
  buttonType = "default",
  minWidth = "fit",
  size = "middle",
}) => {
  const baseClasses = "px-6 py-3 rounded-lg font-semibold transition";
  const styleClasses = {
    default: "bg-white text-blue-600 hover:bg-gray-100",
    neon: "bg-neon text-white hover:bg-neon-dark",
    danger: "bg-red-600 text-white hover:bg-red-700",
    info: "bg-blue-600 text-white hover:bg-blue-700",
    success: "bg-green-600 text-white hover:bg-green-700",
  }[styleType];
  const buttonTypeClasses = {
    default: "",
    outline:
      "bg-transparent border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:bg-opacity-10 transition",
  }[buttonType];
  const minWidthClasses = {
    full: "w-full",
    fit: "w-auto",
  }[minWidth];
  const sizeClasses = {
    large: "text-lg",
    middle: "text-base",
    small: "text-sm",
  }[size];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${styleClasses} ${buttonTypeClasses} ${minWidthClasses} ${sizeClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
