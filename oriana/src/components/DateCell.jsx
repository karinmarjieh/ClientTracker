import React from "react";

const DateCell = ({ session, onOpenSessionModal }) => {
  const sessionDate = new Date(session.date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isToday = sessionDate.toDateString() === today.toDateString();
  const day = sessionDate.getDate().toString().padStart(2, "0");
  const month = (sessionDate.getMonth() + 1).toString().padStart(2, "0");

  return (
    <td
      className={`date-cell ${session.completed ? "completed" : ""} ${
        isToday ? "today" : ""
      }`}
      onClick={onOpenSessionModal}
    >
      <span className="session-number">#{session.number}</span>
      {day}/{month}/{sessionDate.getFullYear()}
    </td>
  );
};

export default DateCell;
