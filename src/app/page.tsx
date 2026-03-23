'use client';

import { useState, useEffect } from 'react';
import { ReservationStep1 } from '@/components/ReservationStep1';
import { ReservationStep2 } from '@/components/ReservationStep2';
import { ReservationStep3 } from '@/components/ReservationStep3';
import { BrandAssets } from '@/components/BrandAssets';
import { getSlots, reserveSlot, Slot, Config } from '@/lib/api';

export default function ReservationPage() {
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState<Config | null>(null);
  const [dates, setDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [slots, setSlots] = useState<Slot[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    emailConfirm: '',
    peopleCount: '1',
    item: 'T-Shirt',
    time: ''
  });

  // Initial load
  useEffect(() => {
    // In a real app, you might fetch initial dates from a default endpoint
    // For now, we'll hardcode the dates or get them from the first slot fetch
    fetchSlots('2024-04-20'); // Initial date
  }, []);

  const fetchSlots = async (date: string) => {
    setIsLoadingSlots(true);
    try {
      const data = await getSlots(date);
      setSlots(data.slots);
      setConfig(data.config);
      if (data.config && data.config.Dates) {
        setDates(data.config.Dates.split(',').map(d => d.trim()));
      }
      setSelectedDate(date);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingSlots(false);
    }
  };

  const handleSelectSlot = (time: string) => {
    setFormData({ ...formData, time });
    setStep(2);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const result = await reserveSlot({
        date: selectedDate,
        ...formData
      });

      if (result.success) {
        setStep(3);
      } else if (result.error === 'Slot already taken') {
        showToast('直前で埋まりました');
      } else {
        showToast('エラーが発生しました');
      }
    } catch (error) {
      showToast('通信エラーが発生しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <main className="min-h-screen p-6 md:p-12 max-w-2xl mx-auto">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top-4">
          <div className="bg-red-600 text-white px-8 py-4 rounded-2xl shadow-2xl font-bold">
            {toast}
          </div>
        </div>
      )}

      {/* Header */}
      <header className="text-center mb-12">
        <div className="inline-block px-4 py-1 rounded-full bg-indigo-100 text-indigo-600 text-xs font-black tracking-widest uppercase mb-4">
          Workshop 2024
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900 mb-4">
          {config?.EventName || 'ワークショップ予約'}
        </h1>
        <div className="h-1.5 w-20 bg-black mx-auto rounded-full" />
      </header>

      {/* Progress Bar */}
      {step < 3 && (
        <div className="flex gap-2 mb-12">
          {[1, 2].map(s => (
            <div 
              key={s} 
              className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= s ? 'bg-black' : 'bg-gray-200'}`} 
            />
          ))}
        </div>
      )}

      {/* Steps */}
      <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
        {step === 1 && (
          <ReservationStep1
            dates={dates}
            selectedDate={selectedDate}
            setSelectedDate={fetchSlots}
            slots={slots}
            onSelectSlot={handleSelectSlot}
            isLoading={isLoadingSlots}
          />
        )}

        {step === 2 && (
          <ReservationStep2
            formData={formData}
            setFormData={setFormData}
            onPrev={() => setStep(1)}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        )}

        {step === 3 && (
          <ReservationStep3
            email={formData.email}
            onReset={() => {
              setStep(1);
              fetchSlots(selectedDate);
            }}
          />
        )}
      </div>

      {/* Brand Assets */}
      {config && <BrandAssets config={config} />}
    </main>
  );
}
