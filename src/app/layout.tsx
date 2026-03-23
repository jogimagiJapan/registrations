import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

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
      <body className={`${noto.variable} font-sans antialiased bg-[#FDFDFB] text-[#1A1A1A]`}>
        {children}
      </body>
    </html>
  );
}
