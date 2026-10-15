
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DnyanPrint | Printing Management Dashboard",
  description:
    "DnyanPrint campus stationery and printing order management dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
