# 6. API Integration Strategy

## Status

ACCEPTED

## Context

We needed a robust strategy for integrating with backend APIs that would:
- Handle data fetching and caching
- Manage loading and error states
- Support real-time updates
- Work well with TypeScript
- Be maintainable and testable
- Provide a good developer experience

## Decision

We chose **React Query (TanStack Query)** for data fetching and server state management because:

1. **Declarative Data Fetching**: Simple API for data fetching and caching
2. **Automatic Caching & Background Updates**: Reduces network requests
3. **TypeScript First**: Excellent TypeScript support
4. **DevTools**: Built-in tools for debugging
5. **Pagination & Infinite Queries**: Built-in support for common patterns
6. **Mutations with Optimistic Updates**: Better UX for mutations
7. **Dependent Queries**: Handle dependent API calls easily

## Implementation Details

### Query Client Setup
```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
```

### Custom Hooks
Create custom hooks for each API endpoint:

```typescript
// hooks/useProjects.ts
export function useProjects() {
  return useQuery(['projects'], async () => {
    const { data, error } = await supabase.from('projects').select('*');
    if (error) throw error;
    return data;
  });
}
```

### Error Handling
- Use React Error Boundaries for uncaught errors
- Show user-friendly error messages
- Implement retry logic for failed requests

### Real-time Updates
```typescript
useEffect(() => {
  const subscription = supabase
    .from('projects')
    .on('*', (payload) => {
      queryClient.invalidateQueries(['projects']);
    })
    .subscribe();

  return () => {
    subscription.unsubscribe();
  };
}, [queryClient]);
```

## Consequences

### Positive
- Simplified data fetching logic
- Automatic background updates
- Built-in caching and deduplication
- Great developer experience
- Good performance with minimal code

### Negative
- Additional bundle size
- Learning curve for complex scenarios
- Need to handle cache invalidation carefully

### Alternatives Considered
- **Redux Toolkit Query**: More opinionated, better with Redux
- **SWR**: Similar to React Query but with fewer features
- **Apollo Client**: Better for GraphQL APIs
- **Custom Hooks**: More boilerplate and maintenance
