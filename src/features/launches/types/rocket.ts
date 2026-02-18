export interface Rocket {
  id: string;
  name: string;
  type: string;
  description: string;
  height: { meters: number | null; feet: number | null };
  diameter: { meters: number | null; feet: number | null };
  mass: { kg: number | null; lb: number | null };
  first_flight: string | null;
  success_rate_pct: number | null;
  active: boolean;
  flickr_images: string[];
}
