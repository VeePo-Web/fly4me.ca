## Add parker@veepo.ca as a second internal recipient

The contact form already sends through Resend via the `send-contact` edge function. Currently the internal enquiry email is sent only to `tobyrennick@gmail.com`. We'll add `parker@veepo.ca` as a second recipient on that same internal email.

### Change

**File:** `supabase/functions/send-contact/index.ts`

In the internal email send (around line 167), update the `to` array:

```ts
to: ["tobyrennick@gmail.com", "parker@veepo.ca"],
```

That's it — one line. Both Toby and Parker will receive every new enquiry. The submitter confirmation email (to the person filling out the form) is unchanged. `reply_to` stays as the submitter's email so replies from either Toby or Parker land in the lead's inbox.

### Out of scope

- No template changes
- No DB schema changes
- No frontend changes
- Submitter auto-reply unchanged
- Sender stays `onboarding@resend.dev` until `fly4me.ca` is verified in Resend
