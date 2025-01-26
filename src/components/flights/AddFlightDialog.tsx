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
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

interface AddFlightDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const AddFlightDialog = ({
  open = true,
  onOpenChange,
}: AddFlightDialogProps) => {
  const { user } = useAuth();
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [aircraftType, setAircraftType] = React.useState("citation");
  const [duration, setDuration] = React.useState("");
  const [flightType, setFlightType] = React.useState("commercial");
  const [departure, setDeparture] = React.useState("");
  const [arrival, setArrival] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !date) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("flights").insert([
        {
          pilot_id: user.id,
          aircraft_type: aircraftType,
          departure_icao: departure,
          arrival_icao: arrival,
          flight_date: date.toISOString(),
          duration: duration,
          flight_type: flightType,
          notes: notes,
        },
      ]);

      if (error) throw error;
      onOpenChange?.(false);

      // Reset form
      setDate(new Date());
      setAircraftType("citation");
      setDuration("");
      setFlightType("commercial");
      setDeparture("");
      setArrival("");
      setNotes("");
    } catch (error) {
      console.error("Error adding flight:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <form onSubmit={handleSubmit} className="space-y-4">
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
                    <Select
                      value={aircraftType}
                      onValueChange={setAircraftType}
                    >
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
                    <Input
                      type="text"
                      placeholder="HH:MM"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Flight Type</Label>
                    <Select value={flightType} onValueChange={setFlightType}>
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
                  <Input
                    placeholder="Departure (ICAO)"
                    value={departure}
                    onChange={(e) => setDeparture(e.target.value)}
                    required
                  />
                  <Input
                    placeholder="Arrival (ICAO)"
                    value={arrival}
                    onChange={(e) => setArrival(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea
                  placeholder="Add any flight notes here..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange?.(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save Flight"}
                </Button>
              </div>
            </form>
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
