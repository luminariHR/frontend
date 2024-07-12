import React, { useState } from "react";
import PropTypes from "prop-types";
import { ChevronDown } from "lucide-react";

const CustomSelectButton = ({
  options,
  selectedOption,
  onSelect,
  defaultText,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left w-full">
      <div className="w-full">
        <button
          type="button"
          className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-2 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption ? selectedOption.name : defaultText}
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute left-0 mt-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {options.map((option) => (
              <div
                key={option.id}
                onClick={() => handleSelect(option)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                {option.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

CustomSelectButton.propTypes = {
  options: PropTypes.array.isRequired,
  selectedOption: PropTypes.object,
  onSelect: PropTypes.func.isRequired,
  defaultText: PropTypes.string,
};

export default CustomSelectButton;
