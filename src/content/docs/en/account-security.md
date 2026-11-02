---
title: Account & Security Guide
description: The Sonic account and security guide — Epomail OAuth sign-in, the session mechanism, API key care, revocation and security advice.
---

**Revision date: 2 November 2026｜Version: 1.8**

The feature descriptions on this page are based on the public release candidate (RC) `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC), reviewed on 2026-11-02. The older public `main@ce443c8` (2026-10-27 UTC) is not evidence that it implements these RC features. The candidate is not an official GitHub Release; the live deployment version and configuration remain unverified.

This page explains how the Sonic account system works and how to use it securely. The full technical description is in [Data Processing & Security](/en/data-security/), section 3.2; the contractual terms are in the [Terms of Service](/en/terms-of-service/), section 3.

## 1. Sign-in method

The service uses Epomail OAuth 2.0 (PKCE), without separate registration: account entry → Epomail authorisation → return to Sonic. State, PKCE and callback checks protect the flow, with a default authentication limit of 30 requests per minute per IP. Sign-in fields do not prove age; the service's 16-year minimum remains a user requirement, not verified age. Email and its verification flag may be received, but the reviewed code does not reject a missing `email_verified` flag. OAuth authentication is not consent to optional profiling or automatic acceptance of all terms.

## 2. The session mechanism

1. **Session cookie**: `sonic_session` is `HttpOnly; Secure; SameSite=Lax` with a default 30-day lifetime. Its signed credential is not encrypted and can contain email, user and role identifiers; HttpOnly restricts script access to the cookie, not persistence of other account data;
2. **Cross-tab sync**: sign-in state is shared across tabs of the same browser; this is not cross-device library backup or proof that copied credentials were revoked;
3. **Local data and keys**: API keys should not be put in URLs. Frontend `auth` localStorage retains email and avatar information; the current DiceBear avatar path may send a plaintext email seed. OAuth transaction cookies last about 600 seconds.

## 3. API key care

An API key is your personal credential (format `sonic_live_v2.…`, signed with HMAC-SHA256):

1. It travels only in request headers and is never placed in a URL;
2. It must not be handed to third parties or embedded in publicly released clients;
3. Re-issuing requires the current valid key; if exposed, sign out promptly and request revocation, then verify the remote result rather than assuming success (see section 4).

## 4. Revocation and sign-out

| Action | Location | Effect |
| --- | --- | --- |
| Sign out | In the player | Clears the current cookie; remote revocation of copied credentials depends on configuration and request success |
| Key revocation | `POST /api/auth/revoke` | Requires supported revocation storage and a successful request; not guaranteed on every instance |
| Bulk invalidation | Deployer configuration | Static jti / subject lists and minimum issuance time must be configured and verified |

## 5. Security advice

1. Sign out and clear browser account data after using a shared device; copied credentials may still need operator-assisted revocation, and browser clearing does not delete remote profiles;
2. Enable two-step verification on your Epomail account (set up on the Epomail side);
3. Do not lend out or share your account — data mixed by account sharing cannot be separated or recovered;
4. If you notice unusual play records or sessions of unknown origin, sign out immediately and write to `admin@epocanvas.com`;
5. The service never collects passwords (sign-in is handled by Epomail); any "Sonic password verification" request is impersonation.

## 6. The account entry

The account entry at the bottom of the sidebar shows the current sign-in state: when signed out it offers sign-in guidance; when signed in it shows the account nickname and a link to account management (pointing to Epomail's profile and inbox). The sign-in state syncs across tabs automatically.
