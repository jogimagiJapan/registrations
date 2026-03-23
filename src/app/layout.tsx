import type { Metadata } from "next";
import { Playfair_Display, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-playfair",
  weight: ["400", "700"], // Use 400 for regular headings
});

const noto = Noto_Sans_JP({ 
  subsets: ["latin"], 
  variable: "--font-noto",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "SEW THE SOUND | Workshop Reservation",
  description: "Record your voice, embroider your soul.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${playfair.variable} ${noto.variable} font-sans antialiased bg-[#FDFDFB] text-[#1A1A1A]`}>
        {children}
      </body>
    </html>
  );
}
