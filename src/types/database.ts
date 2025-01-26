export interface Pilot {
  id: string;
  name: string;
  avatar_url: string;
  license_number: string;
  created_at: string;
  updated_at: string;
}

export interface Flight {
  id: string;
  pilot_id: string;
  aircraft_type: string;
  departure_icao: string;
  arrival_icao: string;
  flight_date: string;
  duration: string;
  flight_type: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Certification {
  id: string;
  pilot_id: string;
  name: string;
  issue_date: string;
  expiry_date: string;
  status: string;
  created_at: string;
  updated_at: string;
}
