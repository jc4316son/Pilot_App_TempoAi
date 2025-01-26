import React from "react";
import DashboardHeader from "./dashboard/DashboardHeader";
import QuickAccessGrid from "./dashboard/QuickAccessGrid";
import MetricsOverview from "./dashboard/MetricsOverview";
import FlightCalendar from "./dashboard/FlightCalendar";
import AddFlightDialog from "./flights/AddFlightDialog";

interface HomeProps {
  pilotName?: string;
  pilotAvatar?: string;
  notifications?: number;
  totalFlightHours?: number;
  recentFlights?: Array<{
    id: string;
    date: string;
    destination: string;
    duration: string;
  }>;
  certificationAlerts?: Array<{
    id: string;
    name: string;
    expiryDate: string;
    daysRemaining: number;
  }>;
  flights?: Array<{
    date: Date;
    description: string;
    type: "scheduled" | "completed";
  }>;
}

const Home = ({
  pilotName,
  pilotAvatar,
  notifications,
  totalFlightHours,
  recentFlights,
  certificationAlerts,
  flights,
}: HomeProps) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardHeader
        pilotName={pilotName}
        pilotAvatar={pilotAvatar}
        notifications={notifications}
      />

      <main className="container mx-auto px-4 py-6 space-y-6">
        <QuickAccessGrid />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <MetricsOverview
              totalFlightHours={totalFlightHours}
              recentFlights={recentFlights}
              certificationAlerts={certificationAlerts}
            />
          </div>
          <div className="lg:col-span-1">
            <FlightCalendar flights={flights} />
          </div>
        </div>
      </main>

      {/* AddFlightDialog is rendered by DashboardHeader */}
      <AddFlightDialog open={false} />
    </div>
  );
};

export default Home;
