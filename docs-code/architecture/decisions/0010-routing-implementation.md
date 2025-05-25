# 10. Routing Implementation

## Status

ACCEPTED

## Context

We needed a routing solution that would:
- Support both public and protected routes
- Handle authentication state properly
- Provide a good user experience with proper redirects
- Be maintainable and scalable
- Work well with React and our chosen authentication solution (Supabase)

## Decision

We implemented routing using **React Router v6** with the following architecture:

1. **Router Setup**:
   - `BrowserRouter` wraps the entire application in `main.tsx`
   - This ensures all components, including `AuthProvider`, have access to routing context

2. **Route Structure**:
   - Public routes (e.g., `/`, `/login`) are accessible without authentication
   - Protected routes (e.g., `/dashboard/*`) require authentication
   - Auth callback route (`/auth/callback`) handles OAuth/social login callbacks

3. **Authentication Integration**:
   - `AuthProvider` manages authentication state and provides it via React Context
   - `ProtectedRoute` component guards routes that require authentication
   - Automatic redirects for unauthenticated users attempting to access protected routes

## Implementation Details

### File Structure
- `main.tsx`: Root component with Router and AuthProvider
- `App.tsx`: Main routing configuration
- `AuthContext.tsx`: Authentication logic and context
- `components/ProtectedRoute.tsx`: Route protection component

### Key Components

1. **AuthProvider**
   - Manages user session state
   - Handles authentication state changes
   - Provides auth context to the entire app
   - Uses `useNavigate` for programmatic navigation

2. **ProtectedRoute**
   - Wraps protected routes
   - Checks authentication status
   - Redirects to login if not authenticated
   - Preserves intended destination for post-login redirect

3. **Route Configuration**
   ```typescript
   <Routes>
     <Route path="/auth/callback" element={<AuthCallback />} />
     <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
     <Route path="/dashboard/*" element={
       <ProtectedRoute>
         <DashboardPage />
       </ProtectedRoute>
     } />
     <Route path="/" element={<Home />} />
     <Route path="*" element={<Navigate to="/" />} />
   </Routes>
   ```

## Consequences

### Positive
- Clear separation between public and protected routes
- Centralized authentication state management
- Good user experience with proper redirects
- Maintainable and scalable routing structure
- Type-safe with TypeScript

### Negative
- Need to ensure proper nesting of providers (Router outside AuthProvider)
- Potential for routing-related bugs if not implemented carefully

### Trade-offs
- Chose to keep routing simple with a single Router at the root level
- Decided against code-splitting routes for initial implementation to keep things simple

## Related Decisions
- [0004-authentication-strategy.md](./0004-authentication-strategy.md)
