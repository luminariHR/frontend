// Modal.js
import React from 'react';
import { XCircle, ChevronsRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Modal = ({ isOpen, onClose, children }) => {
  const navigate = useNavigate();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white w-[600px] h-[300px] rounded-lg shadow-lg p-14 text-xl font-bold">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-700 hover:text-gray-900">
          <XCircle size={24} />
        </button>
        {children}
        <button
          className="flex flex-row whitespace-nowrap mt-10 py-2 text-[14px]
          underline text-[#4146d4] font-bold rounded-full animate-bounce"
          onClick={() => navigate('/signup')}
        >
          루미나리 시작하기 
        </button>
      </div>
    </div>
  );
};

export default Modal;

