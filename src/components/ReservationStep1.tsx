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
    <div className="space-y-10 animate-fade-in">
      <div className="space-y-4">
        <h3 className="text-2xl font-bold tracking-widest text-main uppercase">予約日時を選択</h3>
        <p className="text-[15px] text-sub font-medium leading-relaxed">
          ※ 各回の所要時間は約20分です。ページ下の注意事項をご確認の上、ご希望の日時を選択してください。
        </p>

        {/* Minimal Tabs */}
        <div className="flex gap-8 border-b border-[#F1F1F1] overflow-x-auto whitespace-nowrap scrollbar-hide">
          {dates.map(date => {
            const dateObj = new Date(date);
            const dayOfWeek = new Intl.DateTimeFormat('ja-JP', { weekday: 'short' }).format(dateObj);
            return (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`pb-4 text-sm font-medium transition-all relative ${selectedDate === date
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
              <div className="w-8 h-8 border-2 border-main/20 border-t-main rounded-full animate-spin" />
              <p className="text-[10px] tracking-[0.3em] font-bold text-main uppercase">最新情報を取得中...</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {slots.map(slot => (
            <button
              key={slot.time}
              disabled={!slot.available}
              onClick={() => onSelectSlot(slot.time, slot.available)}
              className={`flex flex-col items-center justify-center p-6 border rounded-xl transition-all duration-300 ${slot.available
                ? 'border-[#C88888] bg-transparent hover:bg-main hover:text-white cursor-pointer'
                : 'bg-[#F1F1F1] border-transparent text-sub cursor-not-allowed opacity-60'
                }`}
            >
              <span className="text-xl font-medium mb-1">{slot.time} 〜</span>
              <span className={`text-[10px] font-bold tracking-widest leading-none ${slot.available ? 'text-main group-hover:text-white' : ''}`}>
                {slot.statusText || (slot.available ? '◎ 予約可能！' : '当日枠あり（選択不可）')}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Status Legend */}
      <div className="pt-12 border-t border-[#F1F1F1] mt-12 space-y-8">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            <span className="shrink-0 text-sm font-bold text-main py-1 px-3 border border-main rounded-full inline-block text-center">◎ 予約可能１</span>
            <p className="text-sm text-sub leading-relaxed">3名様まで同時に体験予約いただけます。ご家族やご友人との参加も可能です。お連れ様は何名でもご一緒にご参加いただけます。</p>
          </div>
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            <span className="shrink-0 text-sm font-bold text-sub py-1 px-3 border border-sub rounded-full inline-block text-center bg-[#F8F8F8]">当日枠あり</span>
            <p className="text-sm text-sub leading-relaxed">事前予約は締切となりましたが、当日先着順でのご案内が可能です。直接会場までお越しください。</p>
          </div>
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            <span className="shrink-0 text-sm font-bold text-[#CCC] py-1 px-3 border border-[#EEE] rounded-full inline-block text-center bg-[#FAFAFA]">受付終了</span>
            <p className="text-sm text-sub leading-relaxed">満席のため受付を終了しました。空席情報はInstagramにて随時更新いたします。</p>
          </div>
        </div>
      </div>
    </div>
  );
};
