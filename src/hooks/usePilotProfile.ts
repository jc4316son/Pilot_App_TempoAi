import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Pilot } from "@/types/database";
import { useAuth } from "@/contexts/AuthContext";

export function usePilotProfile() {
  const [profile, setProfile] = useState<Pilot | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from("pilots")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) throw error;
        setProfile(data);
      } catch (error) {
        console.error("Error fetching pilot profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();

    // Subscribe to realtime changes
    const subscription = supabase
      .channel("pilots_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "pilots",
          filter: `id=eq.${user.id}`,
        },
        (payload) => {
          if (payload.eventType === "UPDATE") {
            setProfile(payload.new as Pilot);
          }
        },
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  return { profile, loading };
}
