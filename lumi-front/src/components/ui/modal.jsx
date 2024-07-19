import React from "react";
import Modal from "react-modal";

const CustomModal = ({
  isOpen,
  closeModal,
  title,
  handleKeyDown,
  children,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={{
        overlay: {
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(76, 76, 76, 0.7)",
        },
        content: {
          zIndex: 51,
          width: "400px",
          margin: "auto",
          borderRadius: "8px",
          padding: "20px",
          background: "white",
        },
      }}
    >
      <h2>{title}</h2>
      <form onKeyDown={handleKeyDown}>{children}</form>
    </Modal>
  );
};

export default CustomModal;

export const CustomModal2 = ({
  isOpen,
  closeModal,
  title,
  width = "400px",
  height = "auto",
  handleKeyDown,
  children,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={{
        overlay: {
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(76, 76, 76, 0.7)",
        },
        content: {
          zIndex: 51,
          width: width,
          height: height,
          margin: "auto",
          borderRadius: "8px",
          padding: "20px",
          background: "white",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        },
      }}
    >
      <h2 className="text-lg font-semibold mb-5">{title}</h2>
      <div>{children}</div>
    </Modal>
  );
};
