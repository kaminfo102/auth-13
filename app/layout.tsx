import './globals.css';
import type { Metadata } from 'next';
import { Vazirmatn } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { createDefaultAdmin } from './actions/auth';

const vazirmatn = Vazirmatn({ subsets: ['arabic'] });

export const metadata: Metadata = {
  title: 'سامانه آموزشی',
  description: 'سامانه مدیریت آموزشی استان کردستان',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    await createDefaultAdmin();
  } catch (error) {
    console.error('Failed to create default admin:', error);
  }

  return (
    <html lang="fa" dir="rtl">
      <body className={vazirmatn.className}>
        {children}
        <Toaster
          position="top-center"
          expand
          richColors
          closeButton
          toastOptions={{
            style: {
              fontSize: '1rem',
              padding: '1rem',
            },
          }}
        />
      </body>
    </html>
  );
}