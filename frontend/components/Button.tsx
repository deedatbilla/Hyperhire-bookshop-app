import React from "react";

function Button({
  type = "button",
  text,
  loading = false,
  onClick,
}: {
  type: "button" | "submit";
  text: string;
  loading?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="px-5 py-2 bg-red-600 text-white"
      type={type}
    >
      {loading ? "Loading" : text}
    </button>
  );
}

export default Button;
