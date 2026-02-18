export interface Launchpad {
  id: string;
  name: string;
  full_name: string;
  locality: string;
  region: string;
  status: LaunchpadStatus;
  details: string | null;
  launch_attempts: number;
  launch_successes: number;
  images: {
    large: string[];
  };
}

export type LaunchpadStatus = 'active' | 'inactive' | 'unknown' | 'retired' | 'lost' | 'under construction';
