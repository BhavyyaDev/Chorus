
import type { Metadata } from "next";
import { Koulen, Bebas_Neue, Manrope } from "next/font/google";
import "./globals.css";
import Nav from "./components/layout/Header";

import { CartProvider } from "./context/CartContext";
import { Toaster } from 'react-hot-toast'

const koulen = Koulen({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-koulen",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const manrope = Manrope({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "CHORUS ENTERPRISE SERIES",
  description: "Chours Enterprise Series-I",
  icons: {
    icon: [
      { url: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
    other: [
      {
        rel: 'icon',
        url: '/favicon.svg',
        type: 'image/svg+xml',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${koulen.variable} ${bebasNeue.variable} ${manrope.variable} antialiased font-koulen`}
      >
        <CartProvider>
          <Nav />
          {children}
           <Toaster

        position="top-right"
        reverseOrder={false}
        gutter={3}
        toastOptions={{
          duration: 2000,
          style: {
            background: '#1a1a1a',
            color: '#fff',
            borderRadius: '8px',
            padding: '16px',
            boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
          },
        }}
      />
        </CartProvider>
      </body>
    </html>
  );
}
