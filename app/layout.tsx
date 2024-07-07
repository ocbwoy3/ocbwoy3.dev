import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ocbwoy3.dev",
  description: "OCbwoy3, but it's the website.",
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
