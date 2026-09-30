import type { Metadata } from "next";
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

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <WalletProviders>
          <SiteHeader />
          <main>{children}</main>
          <footer className="shell muted" style={{ padding: "36px 0 28px", fontSize: 12, borderTop: "1px solid var(--line)", marginTop: 60 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
              <span>© {new Date().getFullYear()} DotaMarkets</span>
              <span>Markets and trading are unavailable until a verified deployment is configured.</span>
            </div>
          </footer>
        </WalletProviders>
      </body>
    </html>
  );
}
