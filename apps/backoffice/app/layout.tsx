import type { Metadata } from "next";
import { TableFilterEnhancer } from "@/components/table-filter-enhancer";
import "./globals.css";

export const metadata: Metadata = {
  title: "FoundJob Backoffice",
  description: "FoundJob administration system."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <TableFilterEnhancer />
        {children}
      </body>
    </html>
  );
}
