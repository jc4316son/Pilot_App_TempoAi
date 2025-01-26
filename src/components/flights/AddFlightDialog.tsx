import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Calendar } from "../ui/calendar";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { PlaneLanding, Upload } from "lucide-react";

interface AddFlightDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const AddFlightDialog = ({
  open = true,
  onOpenChange,
}: AddFlightDialogProps) => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlaneLanding className="h-4 w-4" />
          Add Flight
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Flight</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="manual" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
            <TabsTrigger value="import">Import</TabsTrigger>
          </TabsList>

          <TabsContent value="manual" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date</Label>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Aircraft Type</Label>
                  <Select defaultValue="citation">
                    <SelectTrigger>
                      <SelectValue placeholder="Select aircraft" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="citation">Citation CJ4</SelectItem>
                      <SelectItem value="phenom">Phenom 300</SelectItem>
                      <SelectItem value="king-air">King Air 350</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Flight Duration</Label>
                  <Input type="text" placeholder="HH:MM" />
                </div>

                <div className="space-y-2">
                  <Label>Flight Type</Label>
                  <Select defaultValue="commercial">
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="training">Training</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Route</Label>
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Departure (ICAO)" />
                <Input placeholder="Arrival (ICAO)" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea placeholder="Add any flight notes here..." />
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => onOpenChange?.(false)}>
                Cancel
              </Button>
              <Button>Save Flight</Button>
            </div>
          </TabsContent>

          <TabsContent value="import" className="space-y-4">
            <div className="flex flex-col items-center justify-center space-y-4 border-2 border-dashed rounded-lg p-8">
              <Upload className="h-12 w-12 text-gray-400" />
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Drag and drop your flight log file here
                </p>
                <p className="text-xs text-gray-500">
                  Supports CSV, PDF, and digital logbook exports
                </p>
              </div>
              <Button variant="outline">Browse Files</Button>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => onOpenChange?.(false)}>
                Cancel
              </Button>
              <Button disabled>Import Flights</Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AddFlightDialog;
