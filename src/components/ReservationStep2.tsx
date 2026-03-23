'use client';

import React, { useState, useEffect } from 'react';

interface Step2Props {
  formData: {
    name: string;
    email: string;
    emailConfirm: string;
    peopleCount: string;
    item: string;
    time: string;
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
  const [emailError, setEmailError] = useState(false);

  useEffect(() => {
    if (formData.emailConfirm && formData.email !== formData.emailConfirm) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  }, [formData.email, formData.emailConfirm]);

  const handlePeopleChange = (val: string) => {
    setFormData({ ...formData, peopleCount: val });
  };

  return (
    <div className="space-y-12 animate-fade-in">
      <div className="flex justify-between items-baseline border-b border-[#F1F1F1] pb-6">
        <h3 className="font-playfair text-3xl tracking-wide">Reservation Details</h3>
        <span className="text-sm font-playfair italic text-sub">{formData.time} Slot</span>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); if(!emailError) onSubmit(); }} className="space-y-10">
        {/* Name */}
        <div className="space-y-2">
          <label className="text-[10px] text-sub uppercase tracking-widest font-bold">Full Name (Katakana)</label>
          <input
            type="text"
            required
            placeholder="ヤマダ タロウ"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-transparent border-b border-[#E5E5E5] py-3 focus:border-main focus:outline-none transition-colors placeholder:text-[#BBB]"
          />
        </div>

        {/* Email */}
        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-2">
            <label className="text-[10px] text-sub uppercase tracking-widest font-bold">Email Address</label>
            <input
              type="email"
              required
              placeholder="example@mail.com"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-transparent border-b border-[#E5E5E5] py-3 focus:border-main focus:outline-none transition-colors placeholder:text-[#BBB]"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] text-sub uppercase tracking-widest font-bold">Confirm Email</label>
            <input
              type="email"
              required
              placeholder="Same as above"
              value={formData.emailConfirm}
              onChange={e => setFormData({ ...formData, emailConfirm: e.target.value })}
              className={`w-full bg-transparent border-b py-3 focus:outline-none transition-colors placeholder:text-[#BBB] ${
                emailError ? 'border-[#C88888] text-[#C88888]' : 'border-[#E5E5E5] focus:border-main'
              }`}
            />
            {emailError && <p className="text-[10px] text-[#C88888] font-bold mt-1">メールアドレスが一致しません</p>}
          </div>
        </div>

        {/* People Count (Segmented Switch) */}
        <div className="space-y-4">
          <label className="text-[10px] text-sub uppercase tracking-widest font-bold">Number of People</label>
          <div className="flex border border-[#E5E5E5] rounded-full overflow-hidden w-full max-w-xs">
            {['1', '2', '3'].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => handlePeopleChange(num)}
                className={`flex-1 py-3 text-sm font-medium transition-all ${
                  formData.peopleCount === num 
                    ? 'bg-[#1A1A1A] text-white' 
                    : 'bg-white text-main hover:bg-[#F8F8F8]'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-sub italic">※ 4名以上の場合は別枠で再予約いただくか、事前にお問い合わせください。</p>
        </div>

        {/* Item Selection */}
        <div className="space-y-2">
          <label className="text-[10px] text-sub uppercase tracking-widest font-bold">Embroidery Item</label>
          <select
            value={formData.item}
            onChange={e => setFormData({ ...formData, item: e.target.value })}
            className="w-full bg-transparent border-b border-[#E5E5E5] py-3 focus:border-main focus:outline-none text-main appearance-none"
          >
            <option value="T-Shirt">T-Shirt (Custom Audio Embroidery)</option>
            <option value="Tote Bag">Tote Bag (Custom Audio Embroidery)</option>
            <option value="Pouch">Pouch (Custom Audio Embroidery)</option>
          </select>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-4 pt-10">
          <button
            type="submit"
            disabled={isSubmitting || emailError}
            className="w-full py-5 bg-[#1A1A1A] text-white rounded-full font-bold tracking-widest text-sm hover:bg-[#333] transition-all flex items-center justify-center gap-3 disabled:bg-gray-300"
          >
            {isSubmitting ? (
              <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : 'CONFIRM RESERVATION'}
          </button>
          <button
            type="button"
            onClick={onPrev}
            className="w-full py-4 text-xs text-sub hover:text-main transition-colors font-medium tracking-widest"
          >
            BACK TO DATE SELECTION
          </button>
        </div>
      </form>
    </div>
  );
};
