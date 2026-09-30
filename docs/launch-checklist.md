# DotaMarkets Launch Checklist

## Product and data
- [ ] Four-page scope approved.
- [ ] No fabricated market data or synthetic activity.
- [ ] All market rules and resolution sources published.
- [ ] Data freshness and indexer lag visible.
- [ ] Fees and risks disclosed before signing.

## Protocol
- [ ] Protocol specification approved.
- [ ] Market mechanism and payout model defined.
- [ ] On-chain state machine and invariants tested.
- [ ] Resolution/dispute/cancellation rules implemented.
- [ ] Double-resolution and double-claim prevented.
- [ ] Independent security audit complete.
- [ ] Critical/high findings resolved.

## Infrastructure
- [ ] RPC quotas and failover tested.
- [ ] Indexer backfill, retries, deduplication, and reconciliation tested.
- [ ] Database backups and restore tested.
- [ ] Rate limits and monitoring enabled.
- [ ] Incident response and pause/recovery runbooks approved.
- [ ] Secrets and privileged keys managed securely.

## Legal and operations
- [ ] Jurisdiction-specific legal review complete.
- [ ] Eligibility and geographic controls implemented where required.
- [ ] Terms, privacy, risk notice, and support published.
- [ ] Resolver/admin authority and multisig verified.
- [ ] Production program ID and collateral mint independently verified.
- [ ] Mainnet launch explicitly approved.

## Release
- [ ] Lint passes.
- [ ] Typecheck passes.
- [ ] Unit and integration tests pass.
- [ ] Production build passes.
- [ ] End-to-end tests pass.
- [ ] Mainnet trading remains disabled until every required gate passes.
