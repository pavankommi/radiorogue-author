import type { Metadata } from 'next';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RadioRogue',
  description: 'Stay tuned with the latest things',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen bg-white max-w-7xl mx-auto`}>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
          <Header />
          <main className="flex-grow p-4">
            <div className="bg-white">
              {children}
            </div>
          </main>
          <Footer />
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}