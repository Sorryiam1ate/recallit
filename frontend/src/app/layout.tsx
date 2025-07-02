import type { Metadata } from 'next';
import { Lexend } from 'next/font/google';
import './globals.css';
import '../styles/globals.scss';
import ClientLayout from './ClientLayout';

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['300', '500', '700'],
  variable: '--font-lexend',
});

export const metadata: Metadata = {
  title: 'Recallit',
  description: 'Recallit application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lexend.variable} antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
