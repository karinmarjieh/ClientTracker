import React from "react";

const StatsPanel = ({ stats }) => {
  return (
    <div className="stats">
      <div className="stat-item">
        <div>Total Clients</div>
        <div className="stat-value">{stats.totalClients}</div>
      </div>
      <div className="stat-item">
        <div>Active Trainings</div>
        <div className="stat-value">{stats.activeTrainings}</div>
      </div>
      <div className="stat-item">
        <div>Completed Trainings</div>
        <div className="stat-value">{stats.completedTrainings}</div>
      </div>
      <div className="stat-item">
        <div>Sessions This Week</div>
        <div className="stat-value">{stats.sessionsThisWeek}</div>
      </div>
    </div>
  );
};

export default StatsPanel;
