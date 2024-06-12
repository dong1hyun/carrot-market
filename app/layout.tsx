import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Karrot Market",
    default: "Karrot Market"
  },
  description: "Sell and buy the things!",
};

export default function RootLayout({
  children, // 현재 URL과 일치하는 페이지
}: Readonly<{
  children: React.ReactNode, potato: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} 
      bg-gray-800 text-white max-w-screen-sm m-auto`}>
        {children}
      </body>
    </html>
  );
}