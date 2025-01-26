import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { addDays } from "date-fns";

interface Flight {
  date: Date;
  description: string;
  type: "scheduled" | "completed";
}

interface FlightCalendarProps {
  flights?: Flight[];
}

const defaultFlights: Flight[] = [
  {
    date: new Date(),
    description: "LAX to JFK",
    type: "scheduled",
  },
  {
    date: addDays(new Date(), 2),
    description: "JFK to MIA",
    type: "scheduled",
  },
  {
    date: addDays(new Date(), -1),
    description: "SFO to LAX",
    type: "completed",
  },
];

const FlightCalendar = ({ flights = defaultFlights }: FlightCalendarProps) => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  // Function to check if a date has flights
  const hasFlights = (day: Date) => {
    return flights.some(
      (flight) => flight.date.toDateString() === day.toDateString(),
    );
  };

  // Function to get flights for a specific date
  const getFlightsForDate = (day: Date) => {
    return flights.filter(
      (flight) => flight.date.toDateString() === day.toDateString(),
    );
  };

  return (
    <Card className="w-full max-w-md bg-white">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Flight Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <TooltipProvider>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            modifiers={{
              booked: (date) => hasFlights(date),
            }}
            modifiersStyles={{
              booked: {
                fontWeight: "bold",
                backgroundColor: "rgba(59, 130, 246, 0.1)",
              },
            }}
            components={{
              DayContent: ({ date }) => {
                const dayFlights = getFlightsForDate(date);
                if (dayFlights.length === 0)
                  return <span>{date.getDate()}</span>;

                return (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="relative flex h-full w-full items-center justify-center">
                        {date.getDate()}
                        <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-blue-500" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="space-y-1">
                        {dayFlights.map((flight, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Badge
                              variant={
                                flight.type === "scheduled"
                                  ? "default"
                                  : "secondary"
                              }
                              className="text-xs"
                            >
                              {flight.type}
                            </Badge>
                            <span className="text-sm">
                              {flight.description}
                            </span>
                          </div>
                        ))}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                );
              },
            }}
          />
        </TooltipProvider>
      </CardContent>
    </Card>
  );
};

export default FlightCalendar;
