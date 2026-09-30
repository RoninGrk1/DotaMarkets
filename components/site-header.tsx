"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Brand } from "@/components/brand";

const links = [
  { href: "/", label: "Markets", short: "Markets" },
  { href: "/portfolio", label: "Portfolio", short: "Portfolio" },
  { href: "/account", label: "Account & Help", short: "Help" }
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="site-header">
      <div className="shell site-header-inner">
        <div className="site-header-brand">
          <Brand />
        </div>
        <nav aria-label="Main navigation" className="site-nav">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`navlink ${isActive(pathname, link.href) ? "active" : ""}`}
            >
              <span className="nav-label-full">{link.label}</span>
              <span className="nav-label-short">{link.short}</span>
            </Link>
          ))}
        </nav>
        <div className="site-header-actions">
          <WalletMultiButton style={{ height: 40, borderRadius: 11, background: "#7c3aed", fontFamily: "inherit", fontSize: 13, fontWeight: 700 }} />
        </div>
      </div>
    </header>
  );
}
