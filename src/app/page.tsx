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
    item: '',
    time: ''
  });

  useEffect(() => {
    // Initial fetch to get config and dates
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      // We'll just fetch a default date initially to get the config
      const data = await getSlots('2024-04-20');
      setConfig(data.config);
      if (data.config && data.config.Dates) {
        const dateList = data.config.Dates.split(',').map(d => d.trim());
        setDates(dateList);
        // Initially load slots for the first date
        fetchSlots(dateList[0], data.config);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSlots = async (date: string, currentConfig?: Config) => {
    setIsLoadingSlots(true);
    setSelectedDate(date);
    try {
      const data = await getSlots(date);
      setSlots(data.slots);
      if (!currentConfig && data.config) setConfig(data.config);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingSlots(false);
    }
  };

  const handleSelectSlot = (time: string, isAvailable: boolean) => {
    if (!isAvailable) return;
    setFormData({ ...formData, time });
    setStep(2);
    // Smooth scroll to top when changing steps
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
    <main className="min-h-screen bg-[#FDFDFB] text-[#1A1A1A] font-sans px-6 md:px-12 py-10 md:py-20 animate-fade-in">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-[#1A1A1A] text-white px-10 py-4 rounded-full shadow-2xl font-bold tracking-widest text-xs">
            {toast}
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-24">
        {/* Header / Hero */}
        <header className="text-center space-y-8 pb-12 border-b border-[#F1F1F1]">
          <div>
            <h1 className="text-3xl md:text-4xl tracking-widest-extra uppercase mb-6 animate-fade-in font-bold">
              SEW THE SOUND
            </h1>
            <p className="font-noto text-sm tracking-[0.2em] text-[#666666] leading-relaxed">
              録音した声を、刺繍に変える。
            </p>
          </div>
          <div className="w-px h-12 bg-[#E1E1E1] mx-auto" />
        </header>

        {/* Content Area */}
        <div className="space-y-24">
          {step === 1 && (
            <>
              <ReservationStep1
                dates={dates}
                selectedDate={selectedDate}
                setSelectedDate={(d) => fetchSlots(d)}
                slots={slots}
                onSelectSlot={handleSelectSlot}
                isLoading={isLoadingSlots}
              />
              {config && <BrandAssets config={config} />}
            </>
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
      </div>
    </main>
  );
}
