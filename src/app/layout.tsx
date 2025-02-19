import type { Metadata } from "next";
import "./globals.scss";
import Header from "./components/Header";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "MELI - FE Test",
  description: "MELI page from Frontend Test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Suspense>
          <Header />
          {children}
        </Suspense>
      </body>
    </html>
  );
}
