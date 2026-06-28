import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FoundJob",
  description: "Modern job board for job seekers and companies."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
