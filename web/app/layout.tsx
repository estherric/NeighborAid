import type { Metadata } from "next";
import { SiteChrome } from "../components/SiteChrome";

import "./globals.css";
import "./figma-styles.css";

export const metadata: Metadata = {
  title: "NeighborAid | Real Help. Right Here.",
  description:
    "Connecting Orange County residents with verified housing, food, financial assistance, and community support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}