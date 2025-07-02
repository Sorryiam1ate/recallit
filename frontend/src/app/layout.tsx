import type { Metadata } from 'next';
import { Lexend } from 'next/font/google';
import './globals.css';
import '../styles/globals.scss';
import '../styles/font-preload.css';
import ClientLayout from './ClientLayout';

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['300', '500', '700'],
  variable: '--font-lexend',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'Arial'],
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
      <head>
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;500;700&display=swap"
          as="style"
        />
      </head>
      <body className={`${lexend.variable} antialiased`} style={{ backgroundColor: '#E8EDF2' }}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
