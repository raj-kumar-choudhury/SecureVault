# SecureVault

Secure, multi-user, multi-device personal data vault.

## Authentication milestone

- Sign up
- Sign in
- Password reset request
- Password reset completion
- Supabase Auth session persistence
- Protected vault route

## Local setup

Create `.env.local`:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Then run `npm install` and `npm run dev`.

Configure Supabase Auth redirect URLs for your local and deployed application, including `/login` and `/reset-password`.

The vault encryption and key-management layer is intentionally not implemented in this milestone.