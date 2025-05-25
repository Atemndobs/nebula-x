---
title: Routing
description: Learn about the routing system in Nebula Logix
---

# Routing Guide

Nebula Logix uses React Router v6 for client-side routing with a clear structure for public and protected routes.

## Router Setup

The application's router is set up in `main.tsx` to wrap the entire application:

```typescript
// main.tsx
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
```

## Route Structure

### Public Routes
- `/` - Home page (no authentication required)
- `/login` - Login page
- `/auth/callback` - OAuth callback handler

### Protected Routes
- `/dashboard/*` - Main dashboard (requires authentication)

## ProtectedRoute Component

The `ProtectedRoute` component ensures that only authenticated users can access certain routes:

```typescript
// ProtectedRoute.tsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  if (!user) {
    // Redirect to login page, but save the current location they were trying to go to
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
```

## Navigation

Use the `useNavigate` hook for programmatic navigation:

```typescript
import { useNavigate } from 'react-router-dom';

const MyComponent = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/dashboard');
  };

  return <button onClick={handleClick}>Go to Dashboard</button>;
};
```

## Route Parameters

Define routes with parameters:

```typescript
<Route path="/projects/:projectId" element={<ProjectDetail />} />
```

Access parameters in your component:

```typescript
import { useParams } from 'react-router-dom';

const ProjectDetail = () => {
  const { projectId } = useParams();
  // ...
};
```

## Best Practices

1. Keep route definitions in a central location (e.g., `App.tsx`)
2. Use the `ProtectedRoute` component for authenticated routes
3. Implement proper loading states for route transitions
4. Use relative paths for internal links
5. Keep route parameters consistent across the application
