import { ContextGlobal } from '@/contexts';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Colmeia App',
  description: 'Painel de controle e autenticação segura',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className} cz-shortcut-listen="true">
        <ContextGlobal>{children}</ContextGlobal>
      </body>
    </html>
  );
}
