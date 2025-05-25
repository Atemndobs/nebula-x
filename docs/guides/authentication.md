---
title: Authentication
description: Learn how authentication works in Nebula Logix
---

# Authentication Guide

Nebula Logix uses Supabase for authentication, supporting multiple authentication methods including email/password and social logins.

## Authentication Methods

### Email/Password

1. **Sign Up**
   ```typescript
   const { signUp } = useAuth();
   
   const handleSignUp = async (email: string, password: string) => {
     try {
       await signUp(email, password);
       // Redirect to dashboard or verification page
     } catch (error) {
       console.error('Sign up error:', error);
     }
   };
   ```

2. **Sign In**
   ```typescript
   const { signIn } = useAuth();
   
   const handleSignIn = async (email: string, password: string) => {
     try {
       await signIn(email, password);
       // Redirect to dashboard
     } catch (error) {
       console.error('Sign in error:', error);
     }
   };
   ```

### Social Login

```typescript
import { SocialLoginButtons } from '../../components/auth/SocialLoginButtons';

const LoginPage = () => {
  return (
    <div>
      {/* Other login form elements */}
      <SocialLoginButtons />
    </div>
  );
};
```

### Protected Routes

Use the `ProtectedRoute` component to protect routes that require authentication:

```typescript
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  }
/>
```

## Session Management

The `AuthProvider` component manages the authentication state and provides it to the entire application:

```typescript
const { user, session, loading } = useAuth();
```

## Environment Variables

Make sure to set these environment variables in your `.env` file:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Troubleshooting

### Common Issues

1. **Session not persisting**
   - Ensure `AuthProvider` is properly set up in your app hierarchy
   - Check that Supabase client is correctly initialized

2. **Social login redirects**
   - Verify redirect URLs are whitelisted in your Supabase dashboard
   - Check the authentication callback route (`/auth/callback`)

3. **CORS issues**
   - Ensure your Supabase URL is correctly configured
   - Check network requests in browser dev tools for errors
