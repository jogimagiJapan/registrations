'use client';

import React, { useState } from 'react';

interface Step2Props {
  formData: {
    name: string;
    email: string;
    emailConfirm: string;
    peopleCount: string;
    item: string;
  };
  setFormData: (data: any) => void;
  onPrev: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export const ReservationStep2: React.FC<Step2Props> = ({
  formData,
  setFormData,
  onPrev,
  onSubmit,
  isSubmitting
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = '名前を入力してください';
    if (!formData.email) newErrors.email = 'メールアドレスを入力してください';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = '無効なメール形式です';
    if (formData.email !== formData.emailConfirm) newErrors.emailConfirm = 'メールアドレスが一致しません';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onSubmit();
  };

  return (
    <form onSubmit={handleNext} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">お名前（カナ）</label>
        <input
          type="text"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          className={`w-full p-4 border rounded-xl focus:ring-2 focus:ring-black focus:outline-none transition-shadow ${errors.name ? 'border-red-500' : 'border-gray-200'}`}
          placeholder="ヤマダ タロウ"
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">メールアドレス</label>
        <input
          type="email"
          value={formData.email}
          onChange={e => setFormData({ ...formData, email: e.target.value })}
          className={`w-full p-4 border rounded-xl focus:ring-2 focus:ring-black focus:outline-none ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
          placeholder="name@example.com"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">メールアドレス（受信確認用）</label>
        <input
          type="email"
          value={formData.emailConfirm}
          onChange={e => setFormData({ ...formData, emailConfirm: e.target.value })}
          className={`w-full p-4 border rounded-xl focus:ring-2 focus:ring-black focus:outline-none ${errors.emailConfirm ? 'border-red-500' : 'border-gray-200'}`}
          placeholder="同じアドレスを再度入力"
        />
        {errors.emailConfirm && <p className="text-red-500 text-xs mt-1">{errors.emailConfirm}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">予約人数</label>
          <select
            value={formData.peopleCount}
            onChange={e => setFormData({ ...formData, peopleCount: e.target.value })}
            className="w-full p-4 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-black"
          >
            <option value="1">1名</option>
            <option value="2">2名</option>
            <option value="3">3名 (1時間貸切)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">アイテム</label>
          <select
            value={formData.item}
            onChange={e => setFormData({ ...formData, item: e.target.value })}
            className="w-full p-4 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-black"
          >
            <option value="T-Shirt">Tシャツ (¥3,500)</option>
            <option value="Totebag">トートバッグ (¥2,800)</option>
            <option value="Pouch">ポーチ (¥2,000)</option>
          </select>
        </div>
      </div>

      <div className="flex gap-4 pt-6">
        <button
          type="button"
          onClick={onPrev}
          className="flex-1 py-4 px-6 rounded-2xl border-2 border-gray-100 font-bold hover:bg-gray-50 transition-all"
        >
          戻る
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 py-4 px-6 rounded-2xl bg-black text-white font-bold hover:bg-gray-800 disabled:bg-gray-400 shadow-xl transition-all flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          ) : '予約を確定する'}
        </button>
      </div>
    </form>
  );
};
