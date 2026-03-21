import { useState } from "react";
import "./App.css";

import CompanyDashboard from "./Dashboard";
import TrustBridgeLanding from "./Landing";
import VerifierView from "./VerifierView";

// Define the available views for type safety
type View = "landing" | "dashboard" | "verifier";

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>("landing");

  // Simple router logic
  return (
    <div className="min-h-screen bg-slate-950">
      {currentView === "landing" && (
        <TrustBridgeLanding
          onStart={() => setCurrentView("dashboard")}
          onSearchCompany={() => setCurrentView("verifier")}
        />
      )}

      {currentView === "dashboard" && (
        <CompanyDashboard onLogout={() => setCurrentView("landing")} />
      )}

      {currentView === "verifier" && (
        <VerifierView onBack={() => setCurrentView("landing")} />
      )}
    </div>
  );
};

export default App;
