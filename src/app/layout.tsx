import type { Metadata } from "next";
import { Baloo_2, JetBrains_Mono, Noto_Sans_Thai_Looped, Nunito } from "next/font/google";
import "./globals.css";

const baloo = Baloo_2({
  variable: "--font-baloo",
  weight: ["500", "600", "700", "800"],
  subsets: ["latin"],
});
const nunito = Nunito({
  variable: "--font-nunito",
  weight: ["400", "600", "700", "800"],
  subsets: ["latin"],
});
const notoThai = Noto_Sans_Thai_Looped({
  variable: "--font-noto-thai",
  weight: ["400", "600", "700"],
  subsets: ["thai"],
});
const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  weight: ["400", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ChangLek · Learn",
  description: "English learning for Thai kids — Learn · Grow · Shine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${baloo.variable} ${nunito.variable} ${notoThai.variable} ${jetbrains.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
