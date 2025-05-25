# 4. Authentication Strategy

## Status

ACCEPTED

## Context

We needed an authentication solution that would:
- Provide secure user authentication
- Support multiple authentication providers
- Handle session management
- Work well with React
- Be easy to maintain
- Provide good developer experience

## Decision

We chose **Supabase Auth** as our authentication solution because:
1. **Built-in Authentication**: Email/password, OAuth providers, magic links
2. **JWT-based**: Secure token-based authentication
3. **Row Level Security**: Fine-grained access control in the database
4. **TypeScript Support**: First-class TypeScript support
5. **Real-time Subscriptions**: Built-in real-time capabilities
6. **Self-hosted Option**: Can be self-hosted if needed

We'll use the `@supabase/supabase-js` client library to interact with Supabase Auth in our React application.

## Implementation Details

### Authentication Flow
1. User signs up/in using Supabase Auth methods
2. Supabase returns a JWT token
3. Token is stored in memory (preferred) or secure HTTP-only cookies
4. All subsequent API requests include the token in the Authorization header
5. Supabase middleware validates the token and enforces RLS policies

### Protected Routes
- Use a `ProtectedRoute` component to guard routes that require authentication
- Redirect unauthenticated users to the login page
- Store auth state in React Context for easy access throughout the app

## Consequences

### Positive
- Quick to implement
- Secure by default
- Built-in session management
- Supports social logins
- Good documentation and community support
- Free tier available

### Negative
- Vendor lock-in with Supabase
- Limited customization of auth flows
- Need to handle token refresh logic

### Alternatives Considered
- **Auth0**: More features but more expensive
- **Firebase Auth**: Similar to Supabase but more Google-centric
- **NextAuth.js**: Good for Next.js but we're not using Next.js
- **Custom JWT**: More control but more maintenance overhead
