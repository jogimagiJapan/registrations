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
        <h3 className="text-2xl font-bold tracking-widest text-main uppercase">予約日時を選択</h3>
        
        {/* Minimal Tabs */}
        <div className="flex gap-8 border-b border-[#F1F1F1] overflow-x-auto whitespace-nowrap scrollbar-hide">
          {dates.map(date => {
            const dateObj = new Date(date);
            const dayOfWeek = new Intl.DateTimeFormat('ja-JP', { weekday: 'short' }).format(dateObj);
            return (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`pb-4 text-sm font-medium transition-all relative ${
                  selectedDate === date 
                  ? 'text-main' 
                  : 'text-sub hover:text-main'
                }`}
              >
                {date} ({dayOfWeek})
                {selectedDate === date && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-main" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Grid */}
      <div className="relative min-h-[400px]">
        {isLoading && (
          <div className="absolute inset-0 bg-[#FDFDFB]/80 z-10 flex items-center justify-center backdrop-blur-sm animate-fade-in">
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-2 border-[#1A1A1A]/20 border-t-[#1A1A1A] rounded-full animate-spin" />
              <p className="text-[10px] tracking-[0.3em] font-bold text-main uppercase">取得中...</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {slots.map(slot => (
            <button
              key={slot.time}
              disabled={!slot.available}
              onClick={() => onSelectSlot(slot.time, slot.available)}
              className={`flex flex-col items-center justify-center p-6 border transition-all duration-300 ${
                slot.available
                  ? 'border-[#E5E5E5] bg-transparent hover:bg-[#1A1A1A] hover:text-white cursor-pointer'
                  : 'bg-[#F1F1F1] border-transparent text-sub cursor-not-allowed opacity-60'
              }`}
            >
              <span className="text-xl font-medium mb-1">{slot.time}</span>
              <span className="text-[10px] font-bold tracking-widest leading-none">
                {slot.statusText || (slot.available ? '◎' : '当日枠あり（選択不可）')}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
