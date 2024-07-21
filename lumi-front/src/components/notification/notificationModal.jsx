import React from "react";
import { UserAvatar } from "../ui/avatar.jsx";
import { readAllNotifications } from "../../api/notificationApi.js";

export default function NotificationModal({
  isOpen,
  onClose,
  notifications,
  sendMessage,
}) {
  if (!isOpen) return null;

  const handleReadAll = async () => {
    await readAllNotifications();
    onClose();
  };

  return (
    <div className="fixed top-14 right-20 bg-white w-[23rem] shadow-lg rounded-lg overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">알림</h2>
        <button onClick={handleReadAll} className="text-red-500">
          모두 읽기
        </button>
      </div>
      <div className="px-4 py-2 overflow-y-auto min-h-32 max-h-96">
        {notifications.length === 0 ? (
          <div className={"flex flex-col justify-center items-center min-h-32"}>
            <p className="text-center text-gray-500">알림이 없습니다</p>
          </div>
        ) : (
          notifications.map((notification, index) => (
            <a
              key={index}
              className="flex items-start p-2 border-b cursor-pointer hover:bg-gray-300"
              href={notification.context.path}
              onClick={() => {
                sendMessage({
                  message: "Notification marked as read",
                  message_id: notification.id,
                });
              }}
            >
              {notification.is_read ? null : (
                <span
                  className={"fixed ml-0.5 w-2.5 h-2.5 bg-red-500 rounded-full"}
                ></span>
              )}
              <div className="bg-gray-200 flex-shrink-0 overflow-hidden rounded-full mr-4 w-10 h-10">
                <UserAvatar
                  userProfileImg={notification.context.from.profile_image}
                  userName={notification.context.from.name}
                />
              </div>
              <div className="flex-grow">
                <p className="text-sm">{notification.message}</p>
                <p className="text-xs text-gray-500">
                  {notification.created_at}
                </p>
              </div>
            </a>
          ))
        )}
      </div>
    </div>
  );
}
