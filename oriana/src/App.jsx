import React from "react";
import { useState, useEffect } from "react";
import ClientTable from "./components/ClientTable";
import AddClientForm from "./components/AddClientForm";
import SearchFilter from "./components/SearchFilter";
import StatsPanel from "./components/StatsPanel";
import SessionModal from "./components/SessionModal";
import ConfirmModal from "./components/ConfirmModal";
import "./App.css";

function App() {
  // State variables
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Load data from localStorage on initial render
  useEffect(() => {
    loadData();
  }, []);

  // Add a new client
  const addClient = (clientName, startDate) => {
    if (!clientName.trim()) {
      alert("Please enter a client name");
      return;
    }

    const parsedStartDate = new Date(startDate);
    if (!parsedStartDate || isNaN(parsedStartDate.getTime())) {
      alert("Please select a valid start date");
      return;
    }

    // Generate 10 weekly sessions
    const sessions = [];
    for (let i = 0; i < 10; i++) {
      const sessionDate = new Date(parsedStartDate);
      sessionDate.setDate(parsedStartDate.getDate() + i * 7); // Add weeks

      sessions.push({
        number: i + 1,
        date: sessionDate.toISOString(),
        completed: false,
      });
    }

    // Add client to the array
    const newClients = [
      ...clients,
      {
        id: Date.now().toString(), // Unique ID
        name: clientName,
        sessions: sessions,
      },
    ];

    // Update state and save data
    setClients(newClients);
    saveData(newClients);
  };

  // Open session modal
  const openSessionModal = (client, sessionIndex) => {
    setSelectedClient(client);
    setSelectedSession(sessionIndex);
    const session = client.sessions[sessionIndex];
    const sessionDate = new Date(session.date);
    setRescheduleDate(sessionDate.toISOString().split("T")[0]);
    setShowSessionModal(true);
  };

  // Close all modals
  const closeModals = () => {
    setShowSessionModal(false);
    setShowConfirmModal(false);
  };

  // Mark session as completed
  const completeSession = () => {
    if (!selectedClient || selectedSession === null) return;

    const updatedClients = clients.map((client) => {
      if (client.id === selectedClient.id) {
        const updatedSessions = [...client.sessions];
        updatedSessions[selectedSession] = {
          ...updatedSessions[selectedSession],
          completed: true,
        };
        return { ...client, sessions: updatedSessions };
      }
      return client;
    });

    setClients(updatedClients);
    saveData(updatedClients);
    closeModals();
  };

  // Initiate reschedule process
  const initiateReschedule = () => {
    const newDate = new Date(rescheduleDate);

    if (!newDate || isNaN(newDate.getTime())) {
      alert("Please select a valid date");
      return;
    }

    setShowSessionModal(false);
    setShowConfirmModal(true);
  };

  // Confirm reschedule with or without recalculation
  const confirmReschedule = (recalculateFollowing) => {
    if (!selectedClient || selectedSession === null) return;

    const newDate = new Date(rescheduleDate);

    const updatedClients = clients.map((client) => {
      if (client.id === selectedClient.id) {
        const updatedSessions = [...client.sessions];

        // Update the selected session
        updatedSessions[selectedSession] = {
          ...updatedSessions[selectedSession],
          date: newDate.toISOString(),
        };

        // If recalculating, update all following sessions
        if (recalculateFollowing) {
          for (let i = selectedSession + 1; i < updatedSessions.length; i++) {
            const adjustedDate = new Date(newDate);
            adjustedDate.setDate(newDate.getDate() + (i - selectedSession) * 7);
            updatedSessions[i] = {
              ...updatedSessions[i],
              date: adjustedDate.toISOString(),
            };
          }
        }

        return { ...client, sessions: updatedSessions };
      }
      return client;
    });

    setClients(updatedClients);
    saveData(updatedClients);
    closeModals();
  };

  // Save data to localStorage
  const saveData = (data) => {
    try {
      localStorage.setItem("trainingClients", JSON.stringify(data));
    } catch (error) {
      console.error("Failed to save data:", error);
    }
  };

  // Load data from localStorage
  const loadData = () => {
    try {
      const saved = localStorage.getItem("trainingClients");
      if (saved) {
        setClients(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Failed to load data:", error);
      setClients([]);
    }
  };

  // Export data as CSV
  const exportData = () => {
    if (clients.length === 0) {
      alert("No data to export");
      return;
    }

    let csvContent =
      "Client Name,Session 1,Session 2,Session 3,Session 4,Session 5,Session 6,Session 7,Session 8,Session 9,Session 10\n";

    clients.forEach((client) => {
      let row = `"${client.name}",`;

      client.sessions.forEach((session, index) => {
        const sessionDate = new Date(session.date);
        const formattedDate = `${sessionDate.getDate()}/${
          sessionDate.getMonth() + 1
        }/${sessionDate.getFullYear()}`;
        const status = session.completed ? " (Completed)" : "";

        row += `"${formattedDate}${status}"`;

        if (index < client.sessions.length - 1) {
          row += ",";
        }
      });

      csvContent += row + "\n";
    });

    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", "client_training_data.csv");
    a.click();
  };

  // Calculate statistics
  const calculateStats = () => {
    // Count active and completed trainings
    let activeTrainings = 0;
    let completedTrainings = 0;

    clients.forEach((client) => {
      const completedSessions = client.sessions.filter(
        (s) => s.completed
      ).length;

      if (completedSessions === 10) {
        completedTrainings++;
      } else if (completedSessions > 0) {
        activeTrainings++;
      }
    });

    // Count sessions this week
    const today = new Date();
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + 7);

    let sessionsThisWeek = 0;

    clients.forEach((client) => {
      client.sessions.forEach((session) => {
        if (session.completed) return;

        const sessionDate = new Date(session.date);
        if (sessionDate >= today && sessionDate <= endOfWeek) {
          sessionsThisWeek++;
        }
      });
    });

    return {
      totalClients: clients.length,
      activeTrainings,
      completedTrainings,
      sessionsThisWeek,
    };
  };

  // Filter clients based on search term
  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get statistics
  const stats = calculateStats();

  return (
    <div className="container">
      <h1>Client Training Tracker</h1>

      <div className="controls">
        <AddClientForm onAddClient={addClient} />
        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onExport={exportData}
        />
      </div>

      <ClientTable
        filteredClients={filteredClients}
        onOpenSessionModal={openSessionModal}
      />

      <StatsPanel stats={stats} />

      {showSessionModal && selectedClient && selectedSession !== null && (
        <SessionModal
          client={selectedClient}
          sessionIndex={selectedSession}
          rescheduleDate={rescheduleDate}
          onRescheduleDateChange={setRescheduleDate}
          onComplete={completeSession}
          onInitiateReschedule={initiateReschedule}
          onClose={closeModals}
        />
      )}

      {showConfirmModal && (
        <ConfirmModal onConfirm={confirmReschedule} onClose={closeModals} />
      )}
    </div>
  );
}

export default App;
