# Add Fly4MEdia contact details + wire up real submissions

Two surgical changes — no UX restructure, no calemwood port. Just (1) propagate the new phone & email everywhere they're shown, and (2) make the existing ContactModal actually deliver enquiries via Resend instead of opening a mailto.

---

## 1. Replace contact details everywhere

New canonical contact:
- **Email:** `tobyrennick@gmail.com` (replaces every `hello@fly4media.com`)
- **Phone:** `403-818-9686` (display) / `tel:+14038189686` (link) — newly added

Files touched (display only, no logic):

| File | Change |
|---|---|
| `src/components/fly4media/Footer.tsx` | Swap email; add a `tel:` line under it |
| `src/components/fly4media/ContactModal.tsx` | Swap email in the left brand panel + the "fallback" copy in the success state + mobile footer; add phone line beside email; update mailto fallback recipient |
| `src/pages/About.tsx` | If any contact line exists, swap |
| `index.html` | Update any `mailto:` / structured data references |
| Anywhere else `rg "hello@fly4media|fly4media.com"` finds it | Same swap |

Pre-edit audit: run `rg -n "hello@fly4media|fly4media\.com|mailto:"` to make sure nothing is missed.

The phone is rendered in the editorial voice — small `t-meta`, no icons, just a quiet line beneath the email. No floating "call now" button; that would break the restraint memory rule.

## 2. Make ContactModal actually send (Resend)

Today the modal does `window.location.href = mailto:…`. We replace that with a real submission pipeline.

**Backend (Lovable Cloud):**

1. Migration — `contact_submissions` table:
   - fields: `name`, `email`, `phone` (new optional field added to the form), `project`, `created_at`
   - RLS: anonymous users can `INSERT` only; nobody can `SELECT` (Toby reads via backend dashboard)
2. Add a `phone` field to the modal form (optional) — single new `<Field>`, matches existing styling
3. Edge function `send-contact` (no JWT verify, called from the form):
   - Validates input with zod (name ≤100, email format ≤255, phone optional ≤30, project ≤2000, all `.trim()`)
   - Inserts into `contact_submissions`
   - Sends email via Resend SDK to `tobyrennick@gmail.com` with reply-to set to the submitter
   - Returns `{ ok: true }` or structured error
4. Secret prompt: `RESEND_API_KEY`
5. Sender address: until a domain is verified in Resend, use `onboarding@resend.dev` (Resend's shared sender). Note this only delivers to the verified Resend account email — fine for Toby since he owns the account, but mention so he can verify `fly4me.ca` later for production-grade deliverability.

**Frontend:**

- `ContactModal.tsx` `submit()` now calls `supabase.functions.invoke('send-contact', { body: {...} })`
- Keep the existing success/sending/error states — they already exist in the component
- On error, show the existing error state and surface a mailto fallback link to `tobyrennick@gmail.com` so the user is never stranded
- Strip the `mailto:` redirect entirely

## Out of scope

- Multi-step funnel, photo upload, vCard, framer-motion, haptics from calemwood — explicitly rejected by the user
- Verifying `fly4me.ca` as a Resend sender domain (recommend later)
- Any change to the modal's visual design or layout

## Order of operations

1. Migration (`contact_submissions` + RLS) — needs user approval
2. Prompt for `RESEND_API_KEY`
3. Write edge function + frontend swap + contact-detail swap in parallel
4. Verify: open modal, submit a test enquiry, confirm row in DB and email lands in Toby's inbox
