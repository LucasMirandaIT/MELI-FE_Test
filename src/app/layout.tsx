import type { Metadata } from "next";
import "./globals.scss";
import Header from "../components/Header";
import { SearchProvider } from "@/context/SearchContext";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "MELI - FE Test",
  description: "MELI page from Frontend Test",
};

function withSuspense(children: React.ReactNode, fallback: string = 'Loading...') {
  return <Suspense fallback={<div>{fallback}</div>}>{children}</Suspense>;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SearchProvider>
          {withSuspense(<Header />, 'Loading Header...')}
          {children}
        </SearchProvider>
      </body>
    </html>
  );
}
