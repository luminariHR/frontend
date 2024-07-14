import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

export const Button = ({
  size = "md",
  variant = "default",
  block = false,
  text,
  onClick,
  disabled = false,
  leftIcon,
  rightIcon,
  addClass,
  ...props
}) => {
  const baseStyle =
    "inline-flex items-center justify-center font-medium focus:outline-none transition duration-150 ease-in-out rounded-lg";

  const sizeStyles = {
    sm: "px-2 py-1 text-xs",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const variantStyles = {
    default: "bg-white text-gray-700 border border-gray-300",
    primary: "bg-gray-800 text-white",
    solid: "bg-primary text-white",
    teams: "bg-[#5d5bd4] text-white",
  };

  const stateStyles = {
    default: {
      normal: "hover:bg-gray-100 active:bg-gray-200",
      disabled: "bg-gray-200 text-gray-400 cursor-not-allowed",
    },
    primary: {
      normal: "hover:bg-gray-600 active:bg-gray-700",
      disabled: "bg-gray-300 text-white cursor-not-allowed",
    },
    solid: {
      normal: "hover:bg-[#FFCA27FF] active:bg-primary",
      disabled: "bg-[#F0C84B99] text-white cursor-not-allowed",
    },
    teams: {
      normal: "hover:bg-[#5553c1] active:bg-[#5553c1]",
      disabled: "bg-gray-400 text-white cursor-not-allowed",
    },
  };

  const classes = classNames(
    baseStyle,
    sizeStyles[size],
    variantStyles[variant],
    block ? "w-full" : "",
    disabled ? stateStyles[variant].disabled : stateStyles[variant].normal,
    addClass,
  );

  return (
    <button
      type="button"
      onClick={onClick}
      className={classes}
      disabled={disabled}
      {...props}
    >
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {text}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

Button.propTypes = {
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  variant: PropTypes.oneOf(["default", "primary", "solid"]),
  block: PropTypes.bool,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  leftIcon: PropTypes.element,
  rightIcon: PropTypes.element,
  addClass: PropTypes.string,
};

export default Button;
