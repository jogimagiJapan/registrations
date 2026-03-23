'use client';

import React from 'react';

interface Step3Props {
  onReset: () => void;
  email: string;
}

export const ReservationStep3: React.FC<Step3Props> = ({ onReset, email }) => {
  return (
    <div className="text-center py-12 space-y-6 animate-in zoom-in-95 fade-in duration-700">
      <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-4xl mb-6">
        ✓
      </div>
      <h2 className="text-3xl font-black text-gray-900 tracking-tight">予約が完了しました</h2>
      <div className="bg-gray-50 p-6 rounded-2xl text-gray-600 text-sm leading-relaxed max-w-sm mx-auto">
        <p className="mb-4 font-semibold text-gray-800">
          {email} 宛に確認メールを送信しました。
        </p>
        <p>
          当日お会いできるのを楽しみにしております。<br />
          万が一キャンセルされる場合は、お早めにご連絡ください。
        </p>
      </div>
      <button
        onClick={onReset}
        className="mt-8 py-4 px-10 rounded-full bg-gray-100 font-bold hover:bg-gray-200 transition-all text-gray-600"
      >
        トップへ戻る
      </button>
    </div>
  );
};
