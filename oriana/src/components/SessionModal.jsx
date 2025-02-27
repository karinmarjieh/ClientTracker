import React from "react";

const SessionModal = ({
  client,
  sessionIndex,
  rescheduleDate,
  onRescheduleDateChange,
  onComplete,
  onInitiateReschedule,
  onClose,
}) => {
  const session = client.sessions[sessionIndex];
  const sessionDate = new Date(session.date);

  return (
    <div className="modal">
      <div className="modal-content">
        <h3 className="modal-title">
          {client.name} - Session {session.number}
        </h3>
        <div>
          <p>
            <strong>Date:</strong>{" "}
            {sessionDate.toLocaleDateString("en-GB", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            {session.completed ? "Completed" : "Pending"}
          </p>

          {!session.completed && (
            <>
              <div id="completeContainer">
                <button onClick={onComplete}>Mark as Completed</button>
              </div>
              <div id="rescheduleContainer">
                <p>Reschedule to:</p>
                <input
                  type="date"
                  value={rescheduleDate}
                  onChange={(e) => onRescheduleDateChange(e.target.value)}
                />
                <button onClick={onInitiateReschedule}>Reschedule</button>
              </div>
            </>
          )}
        </div>
        <div className="modal-buttons">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default SessionModal;
