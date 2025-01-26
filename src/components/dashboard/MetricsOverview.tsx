import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { ScrollArea } from "../ui/scroll-area";
import { AlertCircle, Clock, Plane } from "lucide-react";

interface MetricsOverviewProps {
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
}

const MetricsOverview = ({
  totalFlightHours = 1250,
  recentFlights = [
    {
      id: "1",
      date: "2024-03-20",
      destination: "LAX → JFK",
      duration: "5h 45m",
    },
    {
      id: "2",
      date: "2024-03-18",
      destination: "JFK → MIA",
      duration: "2h 50m",
    },
    {
      id: "3",
      date: "2024-03-15",
      destination: "MIA → ORD",
      duration: "3h 15m",
    },
  ],
  certificationAlerts = [
    {
      id: "1",
      name: "Medical Certificate",
      expiryDate: "2024-05-15",
      daysRemaining: 45,
    },
    {
      id: "2",
      name: "Instrument Rating",
      expiryDate: "2024-06-30",
      daysRemaining: 90,
    },
  ],
}: MetricsOverviewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white">
      {/* Total Flight Hours Card */}
      <Card className="col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Flight Hours
          </CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalFlightHours}</div>
          <Progress
            value={75}
            className="mt-4"
            indicatorClassName="bg-blue-500"
          />
          <p className="text-xs text-muted-foreground mt-2">
            75% towards next certification level
          </p>
        </CardContent>
      </Card>

      {/* Recent Flights Card */}
      <Card className="col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Recent Flights</CardTitle>
          <Plane className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[200px]">
            {recentFlights.map((flight) => (
              <div
                key={flight.id}
                className="flex items-center justify-between py-2"
              >
                <div>
                  <p className="text-sm font-medium">{flight.destination}</p>
                  <p className="text-xs text-muted-foreground">{flight.date}</p>
                </div>
                <div className="text-sm">{flight.duration}</div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Certification Alerts Card */}
      <Card className="col-span-1 md:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Certification Renewals
          </CardTitle>
          <AlertCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {certificationAlerts.map((cert) => (
              <div key={cert.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{cert.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Expires: {cert.expiryDate}
                  </p>
                </div>
                <div
                  className={`px-2 py-1 rounded-full text-xs ${
                    cert.daysRemaining <= 30
                      ? "bg-red-100 text-red-800"
                      : cert.daysRemaining <= 60
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                  }`}
                >
                  {cert.daysRemaining} days
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricsOverview;
