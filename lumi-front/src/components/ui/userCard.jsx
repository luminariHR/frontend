import React from "react";
import { UserAvatar } from "./avatar.jsx";

export const UserCard = ({ userItem }) => {
  return (
    <div className="flex items-center my-3 mx-3 relative" key={userItem.id}>
      <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden mr-4 w-12 h-12">
        <UserAvatar
          userProfileImg={userItem["profile_image"]}
          userName={userItem.name}
        />
      </div>
      <div className="flex-grow">
        <div className="font-bold">{userItem.name}</div>
        <div className="text-gray-600">
          {userItem.department ? userItem.department.name : "알 수 없음"}
        </div>
      </div>
    </div>
  );
};
