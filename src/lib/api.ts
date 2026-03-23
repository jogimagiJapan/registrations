export interface Slot {
  time: string;
  available: boolean;
  statusText?: string;
}

export interface Config {
  EventName: string;
  SubTitle?: string;
  NoticeText: string;
  InstagramUrl: string;
  HPUrl: string;
  RewardText: string;
  ApiKey: string;
  Dates: string;
}

export interface SlotsResponse {
  slots: Slot[];
  config: Config;
}

export interface ReserveResponse {
  success: boolean;
  error?: string;
}

export async function getSlots(date: string): Promise<SlotsResponse> {
  const res = await fetch(`/api/slots?date=${date}`);
  if (!res.ok) throw new Error('Failed to fetch slots');
  return res.json();
}

export async function reserveSlot(data: any): Promise<ReserveResponse> {
  const res = await fetch('/api/reserve', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}
