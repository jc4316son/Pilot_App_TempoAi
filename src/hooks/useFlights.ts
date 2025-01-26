import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Flight } from "@/types/database";
import { useAuth } from "@/contexts/AuthContext";

export function useFlights() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchFlights = async () => {
      try {
        const { data, error } = await supabase
          .from("flights")
          .select("*")
          .eq("pilot_id", user.id)
          .order("flight_date", { ascending: false });

        if (error) throw error;
        setFlights(data);
      } catch (error) {
        console.error("Error fetching flights:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();

    // Subscribe to realtime changes
    const subscription = supabase
      .channel("flights_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "flights",
          filter: `pilot_id=eq.${user.id}`,
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setFlights((prev) => [payload.new as Flight, ...prev]);
          } else if (payload.eventType === "DELETE") {
            setFlights((prev) =>
              prev.filter((flight) => flight.id !== payload.old.id),
            );
          } else if (payload.eventType === "UPDATE") {
            setFlights((prev) =>
              prev.map((flight) =>
                flight.id === payload.new.id ? (payload.new as Flight) : flight,
              ),
            );
          }
        },
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  return { flights, loading };
}
