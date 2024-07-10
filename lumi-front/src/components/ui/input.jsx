import React from "react";

export const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
  addClass,
  ...props
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`p-2 border rounded ${addClass}`}
      {...props}
    />
  );
};
