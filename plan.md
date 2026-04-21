# Mainnet Migration Plan

## Phase 1: Remove CaffeineAI Remnants
1. Fix `vite.config.js` — change `blob.caffeine.ai` default to ICP-compliant gateway
2. Fix root `package.json` — rename from `@caffeine/template-app`
3. Fix `src/frontend/package.json` — rename from `@caffeine/template-frontend`
4. Remove caffeine.ai links from `Footer.tsx`
5. Remove caffeine.ai copyright from `i18n.ts`
6. Regenerate `pnpm-lock.yaml` — remove @caffeineai/* packages
7. Clear `canister_ids.json` — remove local-only IDs
8. Delete `project.json` (Caffeine template manifest)

## Phase 2: Config Hardening
9. Add mainnet network to `dfx.json`
10. Add `candid` interface export to backend canister
11. Add `storage` and `gzip` to frontend canister in `dfx.json`
12. Create `src/frontend/dist/.ic-assets.json` with headers and SPA routing
13. Add `.ic-domains` file (placeholder for mainnet)
14. Remove `check-stable` from `mops.toml`

## Phase 3: Backend Cleanup
15. Remove `lib/authorization.mo` (dead code)
16. Remove `types/blob/lib.mo` (dead code)
17. Remove `types/common.mo` (unused types)
18. Remove redundant `persistent`/`transient` keywords from `main.mo`
19. Remove unused `BlobType` import from `area-api.mo`

## Phase 4: Security Fixes
20. Fix token generation in `auth.mo` — add randomness via `Math`
21. Add rate limiting to login (max 5 attempts per 5 minutes)
22. Add input validation for email addresses
23. Fix `Runtime.trap` → error returns in `settings.mo`
24. Fix `Runtime.trap` in `content.mo` → return safe default
25. Hash the emergency recovery secret (not hardcoded in WASM)

## Phase 5: Best Practices
26. Change query-only functions to `query` calls in content-api.mo and registration-api.mo
27. Fix seed data timestamps to use `Time.now()`
