# DotaMarkets — Initial Code Audit

**Audit type:** Static review of the generated starter scaffold  
**Scope:** Frontend, route handlers, schema validation, configuration, and tests  
**Not covered:** Deployed program, economic design, RPC provider configuration, live indexer, production hosting, legal compliance  
**Status:** Not production-ready for trading

## Summary

The scaffold is deliberately read-only. It includes four product pages, a wallet connection provider, a validated market-data contract, and fail-closed behaviour when no trusted indexer is configured. No trading instruction, market creation, settlement, or payout logic is implemented.

No runtime build or test result is claimed here. Dependency installation and `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build` must be run in a network-enabled environment.

## Findings

### P0 — No trading or settlement implementation (intentional blocker)

**Risk:** Critical if the site were represented as a functioning market.  
**Evidence:** The trade button is disabled by default and no transaction builder or financial program is included.  
**Action:** Keep trading disabled. Specify the mechanism, implement the program and client, test invariants, obtain an independent audit, and complete legal review before launch.

### P1 — No indexer implementation included

**Risk:** High for a live product; markets and portfolio cannot be served without a trusted indexer.  
**Evidence:** `MARKETS_API_URL` is an external dependency. Portfolio returns `503`; history returns `503`.  
**Action:** Implement a worker that consumes only the verified program, supports backfill/deduplication/reconciliation, and exposes indexed slot/freshness. Protect the upstream endpoint.

### P1 — Upstream market API trust boundary

**Risk:** High if `MARKETS_API_URL` points to an untrusted service. Schema validation checks shape, not truth or on-chain authenticity.  
**Evidence:** The route validates JSON with Zod but does not independently verify every market account against RPC.  
**Action:** Restrict upstream access, authenticate where appropriate, verify market accounts/program IDs in the indexer, and reconcile against finalized chain state. Do not treat schema validation as cryptographic verification.

### P1 — No rate limiting on API routes

**Risk:** Medium/high under public abuse or expensive upstream calls.  
**Evidence:** Route handlers currently have no application-level rate limiting.  
**Action:** Add edge/server rate limits and provider-side quotas before public deployment. Ensure `/api/health` does not expose sensitive operational details.

### P2 — Wallet support is initially Phantom-only

**Risk:** Medium compatibility limitation.  
**Evidence:** The starter explicitly registers `PhantomWalletAdapter`.  
**Action:** Test with the supported Phantom extension and add other wallet-standard adapters only after validating package compatibility and UX. Do not imply all Solana wallets are supported.

### P2 — Remote font stylesheet dependency

**Risk:** Low; external font host may be blocked or affect privacy/performance.  
**Evidence:** `app/globals.css` imports Google Fonts.  
**Action:** Prefer `next/font` or self-hosted fonts if privacy, CSP, or reliability requirements demand it.

### P2 — Market-detail source handling

**Risk:** Low/medium.  
**Evidence:** Detail page calls `MARKETS_API_URL` directly on the server while the listing uses the local API route.  
**Action:** Consider a shared server-side data adapter to keep validation, timeouts, error handling, and authentication consistent. Keep upstream credentials server-side.

### P2 — Date rendering uses runtime locale/timezone

**Risk:** Low; users may see different date formats/timezones.  
**Evidence:** `toLocaleString()` and `toLocaleDateString()` use runtime defaults.  
**Action:** Choose a consistent display locale and explicitly label timezone where market deadlines are important. Never change the underlying UTC timestamp.

### P2 — Metadata disables indexing globally

**Risk:** Low; may be appropriate during development but prevents search indexing.  
**Evidence:** Root metadata sets `robots: { index: false, follow: false }`.  
**Action:** Keep this during private development. Review before public launch and enable indexing only for pages that should be public.

### P2 — Content Security Policy is not configured

**Risk:** Medium depending on deployment and third-party wallet requirements.  
**Evidence:** Basic security headers are configured, but no CSP is set.  
**Action:** Add a tested CSP compatible with Next.js and wallet providers before production. Do not copy a restrictive policy without testing required script/connect sources.

## Positive controls present

- Trading is hard-disabled in code because no transaction integration exists.
- Program ID and collateral mint are required before the configuration flag can report enabled.
- Missing market indexer returns an explicit `503`, not fake data.
- Market payloads are validated at runtime.
- Invalid Solana wallet addresses are rejected by the portfolio route.
- Upstream requests have a timeout and do not accept a client-supplied URL.
- Basic security headers are set.
- No server-side user-wallet signing or custody logic exists.
- `.env.local` is ignored by Git.
- UI has explicit unavailable/empty states.

## Required checks before merge

Run from the project root after installing dependencies:

```bash
npm install
npm run lint
npm run typecheck
npm test
npm run build
```

Then:
1. Test wallet connection against supported browser wallets.
2. Test all four pages on mobile and desktop.
3. Test malformed upstream payloads, timeouts, and 5xx responses.
4. Verify no secrets appear in client bundles or logs.
5. Run dependency and licence checks.
6. Complete an independent program audit once the program exists.

## Launch decision

**Decision: Do not launch trading.**

This repository is a useful UI/API starter, not a complete or audited prediction market. The missing smart contract, indexer, transaction flow, resolution mechanism, operational controls, and legal review are launch blockers.
