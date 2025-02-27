import React from "react";

const SummaryRow = ({ filteredClients }) => {
  return (
    <tr className="summary-row">
      <td>Summary ({filteredClients.length} clients)</td>
      {[...Array(10)].map((_, sessionNum) => {
        let completed = 0;
        let total = 0;

        filteredClients.forEach((client) => {
          const session = client.sessions.find(
            (s) => s.number === sessionNum + 1
          );
          if (session) {
            total++;
            if (session.completed) {
              completed++;
            }
          }
        });

        const percentage =
          total > 0 ? Math.round((completed / total) * 100) : 0;

        return (
          <td key={sessionNum}>
            {completed}/{total} ({percentage}%)
          </td>
        );
      })}
    </tr>
  );
};

export default SummaryRow;
