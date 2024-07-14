import React from "react";
import Avatar from "boring-avatars";

export const UserAvatar = ({ userProfileImg, userName }) => {
  return userProfileImg ? (
    <img src={userProfileImg} className={`w-full h-full rounded-full`} />
  ) : (
    <Avatar variant="beam" name={userName} size={"100%"} />
  );
};
