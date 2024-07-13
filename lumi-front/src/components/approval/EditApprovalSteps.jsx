import React, { useState } from "react";
import Button from "../ui/button.jsx";
import { ToastEditor } from "./ApprovalRequest.jsx";
import { TextEditor } from "../ui/editor.jsx";
import { ApprovalSteps } from "./ApprovalSteps.jsx";

export const EditApprovalStepsModal = ({ show, onClose, onSubmit }) => {
  const [content, setContent] = useState("결재 내용을 입력해주세요.");
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, text });
    onClose();
  };

  if (!show) {
    return null;
  }

  return (
    <div className="block fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
      <div className="bg-white p-6 rounded-lg shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold">결재선</h2>
        <ApprovalSteps />
        <div className="mb-6"></div>
      </div>
    </div>
  );
};
