'use client'

import { useState, useEffect } from 'react';

export function LoadingSpinner() {
  const [loadingText, setLoadingText] = useState('در حال بارگذاری');

  useEffect(() => {
    const textOptions = [
      'در حال بارگذاری',
      'آماده سازی داده ها',
      'اتصال به سرور',
       'در حال پردازش',
      'تقریباً تمام شد...',
    ];
    let index = 0;
    const interval = setInterval(() => {
      setLoadingText(textOptions[index]);
      index = (index + 1) % textOptions.length;
    }, 1500);
    return () => clearInterval(interval);
  }, []);

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="relative w-16 h-16">
                    <div className="absolute w-full h-full rounded-full border-t-4 border-blue-500 animate-spin"></div>
                    <div className="absolute w-full h-full rounded-full border-t-4 border-purple-500 animate-spin-reverse"></div>
                </div>
                <p className="text-lg font-medium text-gray-300">{loadingText}...</p>
            </div>
        </div>
    );
}

export function LoadingPage() {
  const [loadingText, setLoadingText] = useState('در حال بارگذاری...');

  useEffect(() => {
        const textOptions = [
      'در حال بارگذاری',
      'آماده سازی داده ها',
      'اتصال به سرور',
       'در حال پردازش',
      'تقریباً تمام شد...',
    ];
    let index = 0;
    const interval = setInterval(() => {
      setLoadingText(textOptions[index]);
      index = (index + 1) % textOptions.length;
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
      <div className="flex h-[50vh] items-center justify-center">
          <div className="flex flex-col items-center gap-4">
              <div className="relative w-16 h-16">
                    <div className="absolute w-full h-full rounded-full border-t-4 border-blue-500 animate-spin"></div>
                    <div className="absolute w-full h-full rounded-full border-t-4 border-purple-500 animate-spin-reverse"></div>
              </div>
              <p className="text-lg font-medium text-gray-700">{loadingText}...</p>
          </div>
      </div>
  );
}
