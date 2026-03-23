'use client';

import React from 'react';
import { Slot } from '@/lib/api';

interface Step1Props {
  dates: string[];
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  slots: Slot[];
  onSelectSlot: (time: string, isAvailable: boolean) => void;
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
    <div className="space-y-12 animate-fade-in">
      <div className="space-y-6">
        <h3 className="font-playfair text-3xl tracking-wide text-main">Select Date & Time</h3>
        
        {/* Minimal Tabs */}
        <div className="flex gap-8 border-b border-[#F1F1F1]">
          {dates.map(date => (
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              className={`pb-4 text-sm font-medium transition-all relative ${
                selectedDate === date 
                ? 'text-main' 
                : 'text-sub hover:text-main'
              }`}
            >
              {date}
              {selectedDate === date && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-main" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Time Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {isLoading ? (
          [...Array(8)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-50 animate-pulse rounded-lg" />
          ))
        ) : (
          slots.map(slot => (
            <button
              key={slot.time}
              onClick={() => onSelectSlot(slot.time, slot.available)}
              className={`flex flex-col items-center justify-center p-6 border transition-all duration-300 ${
                slot.available
                  ? 'border-[#E5E5E5] bg-transparent hover:bg-[#1A1A1A] hover:text-white cursor-pointer'
                  : 'bg-[#F1F1F1] border-transparent text-sub cursor-not-allowed'
              }`}
            >
              <span className="text-xl font-medium mb-1">{slot.time}</span>
              <span className="text-xs font-bold tracking-widest">{slot.available ? '◎' : '当日'}</span>
            </button>
          ))
        )}
      </div>
    </div>
  );
};
