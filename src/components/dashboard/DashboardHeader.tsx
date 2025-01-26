import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlusCircle, Bell } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

interface DashboardHeaderProps {
  pilotName?: string;
  pilotAvatar?: string;
  notifications?: number;
}

const DashboardHeader = ({
  pilotName = "John Smith",
  pilotAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=pilot",
  notifications = 3,
}: DashboardHeaderProps) => {
  return (
    <header className="w-full h-20 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-semibold text-gray-900">
          Pilot Dashboard
        </h1>
      </div>

      <div className="flex items-center space-x-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Flight
            </Button>
          </DialogTrigger>
          <DialogContent>
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-4">Add New Flight</h2>
              <p className="text-gray-500">
                Flight entry form will be implemented here
              </p>
            </div>
          </DialogContent>
        </Dialog>

        <div className="relative">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-gray-600" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {notifications}
              </span>
            )}
          </Button>
        </div>

        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={pilotAvatar} alt={pilotName} />
            <AvatarFallback>
              {pilotName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">
              {pilotName}
            </span>
            <span className="text-xs text-gray-500">Commercial Pilot</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
