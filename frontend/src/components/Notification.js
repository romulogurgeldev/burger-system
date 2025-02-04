import React from 'react';

const Notification = ({ message, onClose }) => {
  return (
    <div className="alert alert-info alert-dismissible fade show" role="alert">
      <strong>Notification:</strong> {message}
      <button type="button" className="close" aria-label="Close" onClick={onClose}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

export default Notification;
