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
    <div className="space-y-16 animate-fade-in" style={{ animationDelay: '0.2s' }}>
      {/* Plan Link Card */}
      <section>
        <a
          href="/plan_sts.html"
          className="group bg-main p-8 rounded-2xl flex items-center justify-between text-white transition-all duration-500 hover:opacity-90 shadow-xl"
        >
          <div className="space-y-2">
            <div className="text-[10px] text-[#A1A1A1] uppercase tracking-[0.3em] font-bold">Plan & Item</div>
            <div className="text-2xl font-bold tracking-widest">体験プラン・アイテム</div>
            <p className="text-[10px] text-[#888] italic">価格や刺繍アイテムをご確認いただけます</p>
          </div>
          <div className="w-12 h-12 rounded-full border border-[#333] flex items-center justify-center group-hover:border-white transition-colors">
            <span className="text-xl">→</span>
          </div>
        </a>
      </section>

      {/* Promotion Card */}
      <section className="bg-white rounded-2xl p-8 shadow-sm border border-[#F1F1F1] space-y-6 relative overflow-hidden group hover:shadow-md transition-all duration-700">
        {/* Subtle Accent Background */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#FDFDFB] rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000 ease-out pointer-events-none opacity-50" />

        <div className="flex items-start gap-4 relative z-10">
          <div className="w-2 h-2 rounded-full bg-[#d4a373] mt-2 shrink-0 animate-pulse" />
          <div>
            <h3 className="text-lg font-bold tracking-wide mb-2 uppercase flex items-center gap-3">
              ご予約特典
              <span className="text-[8px] bg-[#d4a373]/10 text-[#d4a373] px-2 py-0.5 rounded-full tracking-widest font-bold">EXCLUSIVE GIFT</span>
            </h3>
            <p className="text-sub text-sm leading-relaxed max-w-2xl">
              {config.RewardText}
            </p>
          </div>
        </div>
      </section>

      {/* Social Cards */}
      <section className="grid md:grid-cols-2 gap-6">
        <a
          href={config.InstagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-white p-8 rounded-2xl border border-[#F1F1F1] hover:border-[#1A1A1A] transition-all duration-500 flex items-center justify-between"
        >
          <div className="space-y-1">
            <div className="text-[10px] text-sub uppercase tracking-widest font-bold">Follow us</div>
            <div className="text-lg font-bold">Instagram</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#F8F8F8] flex items-center justify-center group-hover:bg-[#1A1A1A] group-hover:text-white transition-colors">
            <span className="text-xl">↗</span>
          </div>
        </a>
        <a
          href={config.HPUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-white p-8 rounded-2xl border border-[#F1F1F1] hover:border-[#1A1A1A] transition-all duration-500 flex items-center justify-between"
        >
          <div className="space-y-1">
            <div className="text-[10px] text-sub uppercase tracking-widest font-bold">Official Site</div>
            <div className="text-lg font-bold">SEW THE SOUND</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#F8F8F8] flex items-center justify-center group-hover:bg-[#1A1A1A] group-hover:text-white transition-colors">
            <span className="text-xl">↗</span>
          </div>
        </a>
      </section>

      {/* Caution Box */}
      <section className="bg-transparent border-t border-[#F1F1F1] pt-12">
        <div className="text-[20px] text-sub uppercase tracking-widest mb-4 font-bold">注意事項</div>
        <p className="text-[15px] text-sub leading-loose whitespace-pre-wrap max-w-3xl">
          {config.NoticeText}
        </p>
      </section>
    </div>
  );
};
