

const GAS_URL = process.env.NEXT_PUBLIC_GAS_API_URL!;
const API_KEY = process.env.GAS_API_KEY!; // Note: Using server-side for POST to keep key secret

export interface Config {
  EventName: string;
  Dates: string;
  NoticeText: string;
  InstagramUrl: string;
  HPUrl: string;
  RewardText: string;
  AdminEmail: string;
}

export interface Slot {
  time: string;
  available: boolean;
}

export interface GetSlotsResponse {
  slots: Slot[];
  config: Config;
}

export const getSlots = async (date: string): Promise<GetSlotsResponse> => {
  const response = await fetch(`/api/slots?date=${date}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch slots');
  }

  return response.json();
};

export const reserveSlot = async (data: any) => {
  // Use a route handler to proxy the request and keep API Key secret
  const response = await fetch('/api/reserve', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response.json();
};
