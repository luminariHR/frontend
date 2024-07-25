import React from "react";
import { Button } from "./ui/button.jsx";
import { useNavigate } from "react-router-dom";

export function CareerDetailModal({ isOpen, onClose, data }) {
  const navigate = useNavigate();

  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div
        className={`relative flex bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 w-11/12 max-w-4xl h-[90%]`}
      >
        <div className="flex flex-col w-full h-full">
          <div className="flex flex-col p-8 overflow-y-auto hide-scrollbar">
            <div className="flex flex-col">
              <div className="flex justify-between">
                <h2 className="text-2xl font-bold">{data.title}</h2>
                <Button
                  text="지원하기"
                  variant="teams"
                  onClick={() => {
                    navigate(`/apply/${data.id}`);
                  }}
                />
              </div>

              <div className="w-full border-b mt-1 pb-4">
                <span>모집 분야 : </span>
                <span>{data.position}</span>
              </div>

              <div>
                <div
                  className="prose mt-4 mb-8"
                  dangerouslySetInnerHTML={{ __html: data.description }}
                />
              </div>

              <div className="w-full flex justify-center mt-4">
                <Button text="닫기" onClick={onClose} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CareerDetailModal;
