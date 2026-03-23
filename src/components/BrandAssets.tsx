'use client';

import React from 'react';

interface BrandAssetsProps {
  config: {
    EventName: string;
    NoticeText: string;
    InstagramUrl: string;
    HPUrl: string;
    RewardText: string;
  };
}

export const BrandAssets: React.FC<BrandAssetsProps> = ({ config }) => {
  return (
    <div className="space-y-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
      {/* Promotion Card */}
      <section className="bg-white rounded-2xl p-8 shadow-sm border border-[#F1F1F1] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-2 h-2 rounded-full bg-[#C88888] mt-2 shrink-0" />
          <div>
            <h3 className="font-playfair text-xl tracking-wide mb-2">Exclusive Reward</h3>
            <p className="text-sub text-sm leading-relaxed max-w-md">
              {config.RewardText}
            </p>
          </div>
        </div>
        <div className="flex gap-6 text-xs font-medium shrink-0">
          <a href={config.InstagramUrl} target="_blank" className="text-blue-600 underline underline-offset-4">Instagram</a>
          <a href={config.HPUrl} target="_blank" className="text-blue-600 underline underline-offset-4">Official HP</a>
        </div>
      </section>

      {/* Caution Box */}
      <section className="bg-[#F8F8F8] p-6 rounded-lg">
        <div className="text-[10px] text-sub uppercase tracking-widest mb-3 font-bold">Important Notice</div>
        <p className="text-xs text-sub leading-loose whitespace-pre-wrap">
          {config.NoticeText}
        </p>
      </section>
    </div>
  );
};
