# Changes Required

This document tracks issues found while setting up ASK-CRM and the changes to make manually. Add new numbered entries as issues are discovered.

## 1. Show a helpful error for oversized avatar uploads

**Status:** Open — not implemented.

### What happened

Uploading a large profile picture caused this runtime error:

> Body exceeded 2mb limit.

### Why it happens

There are three checks involved:

| Layer | Current limit | Purpose |
| --- | --- | --- |
| Profile form in the browser | No file-size check before upload | Currently sends the selected file to the server |
| Next.js Server Action request | 2 MB for the entire request | Limits the amount of data the server accepts |
| Avatar validation and Supabase Storage | 1 MB per avatar (1,048,576 bytes) | Enforces the supported avatar size |

The server normally validates the image after receiving it. A request larger than 2 MB is rejected by Next.js before that validation can run, so the user sees a runtime error instead of the avatar validation message.

### Files to understand

- `src/features/account/components/profile-form.tsx`: file picker, image preview, and form submission. Add browser-side validation here.
- `src/features/account/schemas.ts`: defines the existing avatar size and file-type rules. Reuse these rules in the browser so the checks agree.
- `src/features/account/actions.ts`: performs the upload and validates the image signature on the server. Keep server validation in place.
- `next.config.ts`: contains `experimental.serverActions.bodySizeLimit`, currently `"2mb"`.
- `supabase/migrations/0002_avatar_storage.sql`: sets the storage bucket's 1 MB limit and permitted image types.

### Proposed change

Keep the existing 1 MB avatar limit and add validation before the browser sends the image.

- [ ] Export the existing `avatarSchema` from `schemas.ts` and import it into `profile-form.tsx`.
- [ ] Validate the selected file before generating its preview.
- [ ] Show a clear message beside the picker, such as: “Avatar must be 1MB or smaller.”
- [ ] Validate again before calling `execute(...)`; do not send an invalid file.
- [ ] Clear the local error when the user chooses a valid file or removes the selection.
- [ ] Mark the file input invalid and associate it with its error text for accessibility.
- [ ] Keep the existing server validation and storage restrictions.

Increasing only the Next.js request limit would not let larger avatars save: the schema and storage bucket would still reject anything over 1 MB. No database migration is needed for the proposed browser validation fix.

### How to verify

- [ ] A valid supported image smaller than 1 MB uploads and remains after refreshing.
- [ ] A valid image exactly 1,048,576 bytes is accepted by the size checks.
- [ ] A file just over 1 MB shows a helpful error and is not submitted.
- [ ] A file larger than 2 MB shows the same helpful error without a runtime error.
- [ ] An unsupported file type is rejected before upload.
- [ ] Choosing a valid image after an invalid one clears the error and allows saving.
- [ ] Updating the name without selecting an avatar still works.

## 2. Define application roles and permissions before adding RBAC

**Status:** Planning ? roles and permissions are undecided; no application changes made.

### Current behavior

- Supabase Auth provides signup, login, and sessions.
- src/lib/safe-action.ts checks login before protected actions run.
- src/features/dashboard/components/authenticated-dashboard-shell.tsx redirects signed-out visitors to login.
- Policies in src/db/schema/profiles.ts and src/db/schema/payments.ts restrict users to their own records.
- No business roles (administrator, manager, staff), role assignments, or permission checks for such roles are implemented.
- Supabase roles such as anon, authenticated, and service_role are database roles, not CRM business roles.

### Decisions and future work

- [ ] Define required business roles and what each may do.
- [ ] Decide whether roles apply globally or within an organization/team.
- [ ] Decide who may assign or change roles.
- [ ] Store assignments so ordinary users cannot promote themselves.
- [ ] Enforce permissions in server actions and database policies, including server connections that bypass RLS.
- [ ] Update navigation to reflect permissions; hidden buttons alone do not enforce authorization.
- [ ] Test allowed and denied actions and cross-organization access if organizations are introduced.
- [ ] Apply schema and policy changes through new migrations.

## Template for future entries

### Issue title

**Status:** Open / In progress / Done

**What happened:**

**Why it happens:**

**Files involved:**

**Required change:**

**How to verify:**
