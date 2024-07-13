import React from "react";

export const StatusPill = ({
  status = "default",
  size = "md",
  text = "반려",
}) => {
  const sizeStyles = {
    sm: {
      padding: "5px 10px",
      fontSize: "12px",
    },
    md: {
      padding: "10px 20px",
      fontSize: "16px",
    },
    lg: {
      padding: "15px 30px",
      fontSize: "20px",
    },
  };

  const colorStyles = {
    alert: {
      backgroundColor: "#fde8e8",
      color: "#d9534f",
    },
    pending: {
      backgroundColor: "#fdebd0",
      color: "#b07c3a",
    },
    success: {
      backgroundColor: "#d9eaf7",
      color: "#2c4e57",
    },
    default: {
      backgroundColor: "#f0f0f0",
      color: "#606060",
    },
  };

  const buttonStyle = {
    ...sizeStyles[size],
    ...colorStyles[status],
    borderRadius: "8px",
    fontWeight: "bold",
    textAlign: "center",
    display: "inline-block",
  };

  return <div style={buttonStyle}>{text}</div>;
};
