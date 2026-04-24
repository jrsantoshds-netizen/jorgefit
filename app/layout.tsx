import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-heading' });

export const metadata: Metadata = {
  title: 'JORGEFit',
  description: 'App personal de treinos e acompanhamento físico',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${space.variable} dark`}>
      <body className="bg-slate-900 text-slate-50 font-sans antialiased selection:bg-ieadtam-DEFAULT selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
