import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { WalletProviders } from "@/components/wallet-providers";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "DotaMarkets — Predict. Trade. Settle.",
  description: "A lightweight Solana prediction-market interface. Market availability depends on verified deployments.",
  applicationName: "DotaMarkets",
  robots: { index: false, follow: false }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#080810",
  colorScheme: "dark"
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <WalletProviders>
          <SiteHeader />
          <main className="page">{children}</main>
          <footer className="shell muted site-footer">
            <div className="site-footer-inner">
              <span>© {new Date().getFullYear()} DotaMarkets</span>
              <span>Markets and trading are unavailable until a verified deployment is configured.</span>
            </div>
          </footer>
        </WalletProviders>
      </body>
    </html>
  );
}
