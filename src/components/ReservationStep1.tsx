'use client';

import React from 'react';
import { Slot } from '@/lib/api';

interface Step1Props {
  dates: string[];
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  slots: Slot[];
  onSelectSlot: (time: string) => void;
  isLoading: boolean;
}

export const ReservationStep1: React.FC<Step1Props> = ({
  dates,
  selectedDate,
  setSelectedDate,
  slots,
  onSelectSlot,
  isLoading
}) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <label className="block text-sm font-medium text-gray-500 mb-3">開催日を選択</label>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {dates.map(date => (
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                selectedDate === date 
                ? 'bg-black text-white shadow-lg scale-105' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {date}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-500 mb-3">時間を選択 (1時間枠)</label>
        {isLoading ? (
          <div className="grid grid-cols-2 gap-3">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-100 animate-pulse rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {slots.map(slot => (
              <button
                key={slot.time}
                disabled={!slot.available}
                onClick={() => onSelectSlot(slot.time)}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                  slot.available
                    ? 'border-indigo-100 bg-white hover:border-indigo-500 hover:shadow-md cursor-pointer'
                    : 'border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed'
                }`}
              >
                <span className="text-lg font-bold">{slot.time}</span>
                <span className={`text-xs mt-1 ${slot.available ? 'text-indigo-600' : 'text-gray-400'}`}>
                  {slot.available ? '◎ 予約可能' : '当日枠あり'}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
