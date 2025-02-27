import React from "react";

const ConfirmModal = ({ onConfirm, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h3 className="modal-title">Confirm Reschedule</h3>
        <p>Is this the new fixed date for this session?</p>
        <p>
          If you select "Yes", all following sessions will be recalculated based
          on this new date.
        </p>
        <p>If you select "No", only this session will be changed.</p>
        <div className="modal-buttons">
          <button onClick={() => onConfirm(true)}>Yes, recalculate</button>
          <button onClick={() => onConfirm(false)}>
            No, only this session
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
