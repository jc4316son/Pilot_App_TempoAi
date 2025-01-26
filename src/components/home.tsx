import React from "react";
import DashboardHeader from "./dashboard/DashboardHeader";
import QuickAccessGrid from "./dashboard/QuickAccessGrid";
import MetricsOverview from "./dashboard/MetricsOverview";
import FlightCalendar from "./dashboard/FlightCalendar";
import AddFlightDialog from "./flights/AddFlightDialog";
import { useFlights } from "@/hooks/useFlights";
import { useCertifications } from "@/hooks/useCertifications";
import { usePilotProfile } from "@/hooks/usePilotProfile";

const Home = () => {
  const { flights, loading: flightsLoading } = useFlights();
  const { certifications, loading: certificationsLoading } =
    useCertifications();
  const { profile, loading: profileLoading } = usePilotProfile();

  if (flightsLoading || certificationsLoading || profileLoading) {
    return <div>Loading...</div>;
  }

  const totalFlightHours = flights.reduce((total, flight) => {
    const [hours, minutes] = flight.duration.split(":").map(Number);
    return total + hours + minutes / 60;
  }, 0);

  const recentFlights = flights.slice(0, 5).map((flight) => ({
    id: flight.id,
    date: new Date(flight.flight_date).toLocaleDateString(),
    destination: `${flight.departure_icao} → ${flight.arrival_icao}`,
    duration: flight.duration,
  }));

  const certificationAlerts = certifications.map((cert) => ({
    id: cert.id,
    name: cert.name,
    expiryDate: new Date(cert.expiry_date).toLocaleDateString(),
    daysRemaining: Math.ceil(
      (new Date(cert.expiry_date).getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24),
    ),
  }));

  const calendarFlights = flights.map((flight) => ({
    date: new Date(flight.flight_date),
    description: `${flight.departure_icao} → ${flight.arrival_icao}`,
    type: "completed" as const,
  }));
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
