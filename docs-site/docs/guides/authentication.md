---
title: Authentication
description: Learn how authentication works in Nebula Logix
---

# Authentication Guide

Nebula Logix uses Supabase for authentication, supporting email/password and social logins.

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
      <SocialLoginButtons />
    </div>
  );
};
```

## Session Management

Use the `useAuth` hook to access the current user and session:

```typescript
const { user, session, loading } = useAuth();
```

## Environment Variables

Set these in your `.env` file:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```
