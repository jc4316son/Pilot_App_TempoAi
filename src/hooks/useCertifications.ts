import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Certification } from "@/types/database";
import { useAuth } from "@/contexts/AuthContext";

export function useCertifications() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchCertifications = async () => {
      try {
        const { data, error } = await supabase
          .from("certifications")
          .select("*")
          .eq("pilot_id", user.id)
          .order("expiry_date", { ascending: true });

        if (error) throw error;
        setCertifications(data);
      } catch (error) {
        console.error("Error fetching certifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertifications();

    // Subscribe to realtime changes
    const subscription = supabase
      .channel("certifications_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "certifications",
          filter: `pilot_id=eq.${user.id}`,
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setCertifications((prev) => [
              ...prev,
              payload.new as Certification,
            ]);
          } else if (payload.eventType === "DELETE") {
            setCertifications((prev) =>
              prev.filter((cert) => cert.id !== payload.old.id),
            );
          } else if (payload.eventType === "UPDATE") {
            setCertifications((prev) =>
              prev.map((cert) =>
                cert.id === payload.new.id
                  ? (payload.new as Certification)
                  : cert,
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

  return { certifications, loading };
}
