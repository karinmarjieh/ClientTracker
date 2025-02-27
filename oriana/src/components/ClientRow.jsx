import React from "react";
import DateCell from "./DateCell";

const ClientRow = ({ client, onOpenSessionModal }) => {
  return (
    <tr>
      <td>{client.name}</td>
      {client.sessions.map((session, index) => (
        <DateCell
          key={index}
          session={session}
          onOpenSessionModal={() => onOpenSessionModal(client, index)}
        />
      ))}
    </tr>
  );
};

export default ClientRow;
