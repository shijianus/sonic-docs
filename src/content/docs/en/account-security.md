---
title: Account & Security Guide
description: The Sonic account and security guide — Epomail OAuth sign-in, the session mechanism, API key care, revocation and security advice.
---

**Effective date: 2 November 2026｜Version: 1.5**

This page explains how the Sonic account system works and how to use it securely. The full technical description is in [Data Processing & Security](/en/data-security/), section 3.2; the contractual terms are in the [Terms of Service](/en/terms-of-service/), section 3.

## 1. Sign-in method

The service signs you in with an Epomail account over OAuth 2.0 (PKCE) and maintains no separate registration system. The flow: click the account entry in the sidebar → confirm on the Epomail authorization page → return to the service, and sign-in is complete. The authorization callback passes four checks — state, PKCE, the authorization code and replay; authentication endpoints are rate-limited at 30 requests per minute per IP.

## 2. The session mechanism

1. **Session cookie**: a successful sign-in issues an `HttpOnly; Secure; SameSite=Lax` session cookie, valid at most 30 days; the cookie contains the signed API key and is not readable by scripts;
2. **Cross-tab sync**: the signed-in state syncs automatically across the tabs of the same browser; signing out in any tab is sensed by the rest at once;
3. **Key boundaries**: API keys are never written into URLs, query parameters or localStorage; the OAuth transactional cookie is valid for only 600 seconds.

## 3. API key care

An API key is your personal credential (format `sonic_live_v2.…`, signed with HMAC-SHA256):

1. It travels only in request headers and is never placed in a URL;
2. It must not be handed to third parties or embedded in publicly released clients;
3. Re-issuing requires presenting the current valid key; on leakage, sign out and revoke immediately (see section 4).

## 4. Revocation and sign-out

| Action | Location | Effect |
| --- | --- | --- |
| Sign out | In the player | Immediately revokes the current session and key identifier (jti) |
| Key revocation | `POST /api/auth/revoke` | Revokes the current API key |
| Bulk invalidation | Deployer configuration | The jti list, the subject list and the global minimum issuance time |

## 5. Security advice

1. Always sign out after using a shared device (the session cookie contains the signed key);
2. Enable two-step verification on your Epomail account (set up on the Epomail side);
3. Do not lend out or share your account — data mixed by account sharing cannot be separated or recovered;
4. If you notice unusual play records or sessions of unknown origin, sign out immediately and write to `admin@epocanvas.com`;
5. The service never collects passwords (sign-in is handled by Epomail); any "Sonic password verification" request is impersonation.

## 6. The account entry

The account entry at the bottom of the sidebar shows the current sign-in state: when signed out it offers sign-in guidance; when signed in it shows the account nickname and a link to account management (pointing to Epomail's profile and inbox). The sign-in state syncs across tabs automatically.
