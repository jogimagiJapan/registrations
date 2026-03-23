'use client';

import React from 'react';

interface Step3Props {
  onReset: () => void;
  email: string;
}

export const ReservationStep3: React.FC<Step3Props> = ({ onReset, email }) => {
  return (
    <div className="text-center py-20 space-y-8 animate-fade-in">
      <h2 className="text-3xl font-bold tracking-widest text-main mb-4 uppercase">Reserved.</h2>
      <div className="h-px w-12 bg-main mx-auto mb-8" />
      <div className="space-y-4 max-w-sm mx-auto">
        <p className="font-noto text-sm leading-relaxed text-sub">
          ご予約が完了しました。<br />
          <span className="text-main font-bold">{email}</span> 宛に確認メールを送信しました。
        </p>
        <p className="text-xs text-sub/70 leading-relaxed italic">
          当日お会いできるのを楽しみにしております。
        </p>
      </div>
      <button
        onClick={onReset}
        className="mt-12 py-4 px-12 border border-main rounded-full text-[10px] tracking-widest font-bold hover:bg-main hover:text-white transition-all duration-500 uppercase"
      >
        Back to Top
      </button>
    </div>
  );
};
