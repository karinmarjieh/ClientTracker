import React, { useState } from "react";

const AddClientForm = ({ onAddClient }) => {
  const [clientName, setClientName] = useState("");
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddClient(clientName, startDate);
    setClientName("");
  };

  return (
    <div className="add-client-form">
      <input
        type="text"
        placeholder="Client Name"
        value={clientName}
        onChange={(e) => setClientName(e.target.value)}
      />
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <button onClick={handleSubmit}>Add Client</button>
    </div>
  );
};

export default AddClientForm;
