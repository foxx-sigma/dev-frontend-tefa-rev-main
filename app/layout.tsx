import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "TEFA SMK Telkom Malang — Teaching Factory",
  description:
    "Teaching Factory SMK Telkom Malang menghubungkan pendidikan vokasi dengan industri melalui proyek nyata di bidang software, jaringan, dan multimedia. Layanan profesional dari siswa bimbingan industri.",
  icons: {
    icon: "/Logo-SMK Telkom.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
