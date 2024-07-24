import React from "react";

import Messenger from "./Messenger.jsx";

const MessengerModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-10">
        <Messenger />
      </div>
    </>
  );
};

export default MessengerModal;
