# DotaMarkets

A dark, lightweight Next.js starter for a Solana prediction-market website.

## Current implementation status

Wallet connection is wired for the Phantom browser extension. Other wallets are not yet configured.

This repository is a **read-only frontend and API scaffold**, not a complete prediction-market protocol. It intentionally does not implement financial transactions, market creation, an indexer, or settlement. Trading is disabled by default.

The UI does not fabricate markets. Without a configured `MARKETS_API_URL`, the market endpoint returns `503` and the UI displays an explicit unavailable state.

## Requirements

- Node.js 20.9 or later (use a currently supported LTS release)
- npm
- Optional: Solana wallet browser extension
- A real, trusted indexer API before displaying live markets

## Setup

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open http://localhost:3000.

## Validation

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Run these commands in a network-enabled environment after installing dependencies. A passing frontend build does not certify a smart contract or prediction-market system.

## Data contract

`GET /api/markets` expects the configured upstream `GET /markets` response to match the schema in `lib/market-types.ts`:

```json
{
  "markets": [],
  "source": "verified-indexer",
  "indexedAt": "2030-01-01T00:00:00Z",
  "slot": 123
}
```

The example is a schema illustration only. Do not seed it as production data. Every market item must include the required fields defined by `MarketSchema`.

Configure `MARKETS_API_URL` only for a trusted, authenticated or appropriately protected indexer service. The upstream must verify that records correspond to the correct deployed program and authoritative on-chain state.

## Trading

Trading is intentionally not implemented and is hard-disabled in code. Changing `NEXT_PUBLIC_TRADING_ENABLED` cannot enable trading. A production trading flow requires:
- A specified and reviewed market mechanism.
- A deployed and verified program and IDL.
- Correct collateral mint and token-program configuration.
- Transaction construction, simulation, signing, confirmation, and recovery.
- Audited resolution and claim logic.
- Independent security review and jurisdiction-specific legal review.

## Pages

- `/` — market discovery
- `/markets/[marketId]` — market details and disabled trade panel
- `/portfolio` — wallet state and indexer-not-configured message
- `/account` — network, help, and risk information

## Security notes

- Do not commit `.env.local`.
- Do not request or store wallet seed phrases.
- Do not put secrets in `NEXT_PUBLIC_*` variables.
- Use a multisig or secure signing workflow for privileged operations.
- Mainnet trading must remain disabled until all security, legal, protocol, and operational launch gates pass.

See `AUDIT.md` for the initial static review and known blockers.
