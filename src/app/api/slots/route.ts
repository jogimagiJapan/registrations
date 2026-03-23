import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const GAS_URL = process.env.NEXT_PUBLIC_GAS_API_URL!;
    const API_KEY = process.env.GAS_API_KEY!;

    const response = await fetch(`${GAS_URL}?action=getSlots&date=${date}&apiKey=${API_KEY}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store',
    });

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
