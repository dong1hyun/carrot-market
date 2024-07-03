import type { Metadata } from "next";
import { Roboto, Rubik_Scribble, Gothic_A1 } from "next/font/google";
import "./globals.css";

const gothic = Gothic_A1({
  subsets:["latin"],
  weight:["400"],
  variable: "--gothic"
})

const roboto = Roboto({ 
  subsets: ["latin"],
  weight: ["100", "300"],
  style: ["normal", "italic"],
  variable: "--roboto-text"
});

const rubick = Rubik_Scribble({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
  variable: "--rubick-text",
});

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
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${gothic.variable} ${rubick.variable}
      bg-gray-800 text-white max-w-screen-sm m-auto`}>
        {children}
      </body>
    </html>
  );
}