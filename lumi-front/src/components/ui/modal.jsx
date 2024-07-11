import React from 'react';
import Modal from 'react-modal';

const CustomModal = ({
  isOpen,
  closeModal,
  title,
  handleKeyDown,
  children
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={{
        overlay: {
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(76, 76, 76, 0.7)'
        },
        content: {
          zIndex: 51,
          width: '400px',
          margin: 'auto',
          borderRadius: '8px',
          padding: '20px',
          background: 'white'
        }
      }}
    >
      <h2>{title}</h2>
      <form onKeyDown={handleKeyDown}>
        {children}
      </form>
    </Modal>
  );
};

export default CustomModal;
