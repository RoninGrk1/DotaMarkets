"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Brand } from "@/components/brand";

const links = [
  { href: "/", label: "Markets" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/account", label: "Account & Help" }
];

export function SiteHeader() {
  const pathname = usePathname();
  return (
    <header style={{ borderBottom: "1px solid var(--line)", background: "rgba(8,8,16,.82)", backdropFilter: "blur(16px)", position: "sticky", top: 0, zIndex: 20 }}>
      <div className="shell" style={{ minHeight: 76, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 18 }}>
        <Brand />
        <nav aria-label="Main navigation" style={{ display: "flex", alignItems: "center", gap: 22 }}>
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={`navlink ${pathname === link.href ? "active" : ""}`}>
              {link.label}
            </Link>
          ))}
        </nav>
        <WalletMultiButton style={{ height: 40, borderRadius: 11, background: "#7c3aed", fontFamily: "inherit", fontSize: 13, fontWeight: 700 }} />
      </div>
      <style jsx>{`
        @media (max-width: 720px) {
          header .shell { flex-wrap: wrap; padding: 12px 0; }
          nav { order: 3; width: 100%; justify-content: space-between; gap: 8px !important; }
        }
      `}</style>
    </header>
  );
}
