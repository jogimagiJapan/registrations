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
    <div className="space-y-8 mt-12 pt-8 border-t border-gray-100">
      <section className="bg-amber-50 p-6 rounded-2xl">
        <h3 className="text-amber-900 font-bold mb-3 flex items-center gap-2">
          <span className="text-xl">⚠️</span> 注意事項
        </h3>
        <p className="text-amber-800 text-sm whitespace-pre-wrap leading-relaxed">
          {config.NoticeText}
        </p>
      </section>

      <section className="bg-indigo-50 p-6 rounded-2xl">
        <h3 className="text-indigo-900 font-bold mb-3 flex items-center gap-2">
          <span className="text-xl">🎁</span> 予約特典
        </h3>
        <p className="text-indigo-800 text-sm whitespace-pre-wrap leading-relaxed">
          {config.RewardText}
        </p>
      </section>

      <footer className="flex justify-center gap-6 mt-12 pb-8">
        <a 
          href={config.InstagramUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-pink-600 transition-colors"
        >
          Instagram
        </a>
        <a 
          href={config.HPUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-black transition-colors"
        >
          Official HP
        </a>
      </footer>
    </div>
  );
};
