import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Plane, Award, Calendar, GraduationCap } from "lucide-react";

interface QuickAccessCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description?: string;
}

const QuickAccessCard = ({
  title = "Title",
  value = "0",
  icon = <Plane className="h-6 w-6" />,
  description = "Description",
}: QuickAccessCardProps) => {
  return (
    <Card className="bg-white hover:bg-gray-50 transition-colors cursor-pointer">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

interface QuickAccessGridProps {
  cards?: QuickAccessCardProps[];
}

const QuickAccessGrid = ({ cards }: QuickAccessGridProps) => {
  const defaultCards = [
    {
      title: "Logbook",
      value: "156 hrs",
      icon: <Plane className="h-6 w-6" />,
      description: "Total flight hours",
    },
    {
      title: "Certifications",
      value: "3 Active",
      icon: <Award className="h-6 w-6" />,
      description: "1 renewal upcoming",
    },
    {
      title: "Schedule",
      value: "2 Upcoming",
      icon: <Calendar className="h-6 w-6" />,
      description: "Next flight in 3 days",
    },
    {
      title: "Training",
      value: "85%",
      icon: <GraduationCap className="h-6 w-6" />,
      description: "Current progress",
    },
  ];

  const displayCards = cards || defaultCards;

  return (
    <div className="w-full bg-gray-100 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayCards.map((card, index) => (
          <QuickAccessCard
            key={index}
            title={card.title}
            value={card.value}
            icon={card.icon}
            description={card.description}
          />
        ))}
      </div>
    </div>
  );
};

export default QuickAccessGrid;
