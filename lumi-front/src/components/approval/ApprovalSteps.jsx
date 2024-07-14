import React, { useState } from "react";
import { AddApprovalStepModal } from "./AddApprovalStepModal";
import { UserAvatar } from "../ui/avatar.jsx";
import { useRecoilValue } from "recoil";
import { loggedInUserState } from "../../state/userAtom.js";

export const ApprovalSteps = ({ data, setData }) => {
  const [isAddApprovalModalOpen, setIsAddApprovalModalOpen] = useState(false);
  const [selectedReviewer, setSelectedReviewer] = useState(null);
  const user = useRecoilValue(loggedInUserState);

  const addNewItem = (item) => {
    if (user.id != item.id) {
      const newItem = {
        id: item.id,
        name: item.name,
        department: item.department.name,
        profile_image: item["profile_image"],
      };
      setData([...data, newItem]);
    }
  };

  const removeItem = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };

  const handleSelectReviewer = (value) => {
    if (value) {
      setSelectedReviewer(value);
      setIsAddApprovalModalOpen(false);
      addNewItem(value);
      setSelectedReviewer(null);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <AddApprovalStepModal
        userData={data}
        isOpen={isAddApprovalModalOpen}
        onSelect={handleSelectReviewer}
        onClose={() => setIsAddApprovalModalOpen(false)}
      />
      <h2 className="text-xl font-semibold mt-4 mb-1">결재선</h2>
      <h3 className="text-m text-gray-500 mb-7">
        아래 순서대로 결재가 요청됩니다.
      </h3>
      <div className="relative mt-4">
        {data.map((item, index) => (
          <div className="flex items-center mb-6 relative" key={index}>
            <div className="bg-gray-200 flex-shrink-0 overflow-hidden rounded-full mr-4 w-12 h-12">
              <UserAvatar
                userProfileImg={item["profile_image"]}
                userName={item.name}
              />
            </div>
            <div className="flex-grow">
              <div className="font-bold">{item.name}</div>
              <div className="text-gray-600">{item.department}</div>
              {item.date && (
                <div className="text-gray-400 text-sm">{item.date}</div>
              )}
            </div>
            <div
              onClick={() => removeItem(item.id)}
              className={`cursor-pointer flex-shrink-0 w-16 text-center py-1 rounded-full text-sm font-bold bg-red-500 text-white`}
            >
              {"삭제"}
            </div>
          </div>
        ))}
        <div className="flex items-center mb-6 relative">
          <button
            onClick={() => setIsAddApprovalModalOpen(true)}
            className="bg-[#5d5bd4] hover:bg-[#5553c1] text-white font-bold py-2 px-4 rounded-full flex items-center justify-center w-12 h-12"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};
